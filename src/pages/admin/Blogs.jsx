import { useEffect, useRef, useState } from "react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../../services/blogService";
import { Edit3, Trash2, PlusCircle, Upload, Loader2, Eye, X, Save } from "lucide-react";
import { resolveImageUrl } from "../../services/contentService";
import { formatDateTimeIndonesia } from "../../utils/dateTime";
import { stripText } from "../../utils/text";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ title: "", category: "", content: "" });
  const [viewBlog, setViewBlog] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getBlogs();
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.content) {
      alert("Mohon isi semua field!");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("content", form.content);
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      editingId ? await updateBlog(editingId, formData) : await createBlog(formData);
      alert("Data berhasil disimpan!");
      resetForm();
      fetchBlogs();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menyimpan data!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch {
      alert("Gagal menghapus data!");
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog.id);
    setForm({ title: blog.title || "", category: blog.category || "", content: blog.content || "" });
    setPreview(resolveImageUrl(blog.image_url));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", category: "", content: "" });
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Manajemen Blog</h1>
        <p className="text-gray-500 mt-2">Kelola artikel, lihat detail panjang, dan edit konten dari satu halaman.</p>
      </header>

      <section className="bg-white p-8 rounded-3xl border-l-4 border-emerald-500 shadow-sm mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          {editingId ? <Edit3 className="text-amber-500" /> : <PlusCircle className="text-emerald-500" />}
          {editingId ? "Edit Artikel" : "Buat Artikel Baru"}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div onClick={() => fileInputRef.current.click()} className="group relative h-64 w-full border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 overflow-hidden hover:border-emerald-500 transition-all">
              {preview ? <img src={preview} className="h-full w-full object-cover" alt="preview" /> : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-emerald-500 transition">
                  <Upload size={32} className="mb-2" />
                  <span className="text-sm font-medium">Klik untuk upload</span>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
              const nextFile = e.target.files?.[0];
              if (!nextFile) return;
              setFile(nextFile);
              setPreview(URL.createObjectURL(nextFile));
            }} accept="image/*" />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <input className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Judul Artikel..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Kategori" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <textarea className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl h-44 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Tuliskan isi konten di sini..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
          {editingId && <button type="button" onClick={resetForm} className="px-6 py-3 font-semibold text-gray-500 hover:text-gray-800 transition">Batal</button>}
          <button type="button" onClick={handleSave} disabled={loading} className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-200 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
            {editingId ? "Update Perubahan" : "Terbitkan Artikel"}
          </button>
        </div>
      </section>

      {loading && !blogs.length ? <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-600" size={40} /></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="group bg-white rounded-3xl p-3 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-2xl h-52">
                <img src={resolveImageUrl(blog.image_url)} className="w-full h-full object-cover" alt={blog.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => setViewBlog(blog)} className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40"><Eye size={20} /></button>
                  <button onClick={() => startEdit(blog)} className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40"><Edit3 size={20} /></button>
                  <button onClick={() => handleDelete(blog.id)} className="p-3 bg-red-500/80 backdrop-blur-md rounded-xl text-white hover:bg-red-600"><Trash2 size={20} /></button>
                </div>
              </div>
              <div className="p-4 pl-5 border-l-4 border-emerald-500 my-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-600">{blog.category}</span>
                <h3 className="font-bold text-lg mt-1 text-gray-800 line-clamp-2">{blog.title}</h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{stripText(blog.content, 100)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewBlog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[88vh] relative animate-in fade-in zoom-in duration-300 overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between z-10">
              <div>
                <p className="text-xs font-bold uppercase text-emerald-600">Detail Artikel</p>
                <h2 className="font-black text-xl text-slate-800 line-clamp-1">{viewBlog.title}</h2>
              </div>
              <button onClick={() => setViewBlog(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={20} /></button>
            </div>
            <div className="overflow-y-auto max-h-[calc(88vh-88px)] p-8">
              <img src={resolveImageUrl(viewBlog.image_url)} className="w-full max-h-[360px] object-cover rounded-2xl mb-6" alt="view" />
              <div className="border-l-4 border-emerald-500 pl-5">
                <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">{viewBlog.category}</span>
                <h1 className="text-3xl font-black text-gray-800 mt-4 mb-2">{viewBlog.title}</h1>
                <p className="text-sm text-slate-400 mb-6">{formatDateTimeIndonesia(viewBlog.published_at || viewBlog.createdAt)} WIB</p>
                <p className="text-gray-700 leading-8 text-base whitespace-pre-line">{viewBlog.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
