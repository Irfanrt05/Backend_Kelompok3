import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, FileText, Loader2 } from "lucide-react";
import { getPublicBlogs, resolveImageUrl } from "../../services/contentService";
import { formatDateIndonesia } from "../../utils/dateTime";
import { stripText } from "../../utils/text";

export default function UserArticles() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getPublicBlogs();
        setBlogs(res.data.data || res.data.blogs || []);
      } catch (err) {
        console.error("Gagal mengambil artikel user:", err);
        setError("Artikel belum bisa dimuat. Pastikan backend berjalan dan endpoint /api/blogs aktif.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter((blog) =>
      `${blog.title || ""} ${blog.category || ""} ${blog.content || ""}`.toLowerCase().includes(q),
    );
  }, [blogs, keyword]);

  return (
    <section className="pt-3 w-full">
      <div className="grid lg:grid-cols-[minmax(0,720px)_1fr] gap-10 items-end mb-10">
        <div>
          <h1 className="text-[28px] font-black text-black mb-7">Blog</h1>
          <p className="text-[18px] leading-[1.45] text-black">
            Ikuti perkembangan informasi dan berita terbaru dari artikel kami. Informasi dibuat berdasarkan data dan riset dari sumber terpercaya mengenai perilaku hidup sehat, olahraga, dan kesehatan.
          </p>
        </div>
        <div className="hidden lg:flex justify-end">
          <div className="bg-white rounded-3xl px-7 py-5 shadow-sm border border-slate-100 min-w-[260px]">
            <p className="text-sm text-slate-500">Total Artikel</p>
            <h2 className="text-4xl font-black text-[#10BB89] mt-1">{blogs.length}</h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 mb-9">
        <h2 className="text-[28px] font-black text-black">Top Artikel</h2>
        {keyword && <p className="text-sm text-slate-500">Hasil pencarian: <b>{keyword}</b></p>}
      </div>

      {loading ? (
        <div className="h-[280px] flex items-center justify-center text-slate-500 gap-3">
          <Loader2 className="animate-spin" /> Memuat artikel...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-red-100 p-6 text-red-500 flex items-start gap-3">
          <AlertCircle /> <span>{error}</span>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-slate-500">
          Tidak ada artikel yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredBlogs.map((blog) => (
            <Link
              to={`/dashboard/articles/${blog.id}`}
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-200 min-h-[305px] flex flex-col"
            >
              <img
                src={resolveImageUrl(blog.image_url)}
                alt={blog.title}
                className="h-[170px] w-full object-cover bg-slate-200"
              />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase text-[#10BB89] flex items-center gap-1">
                    <FileText size={14} /> {blog.category || "Artikel"}
                  </span>
                  <span className="text-[11px] text-slate-400">{formatDateIndonesia(blog.published_at || blog.createdAt)}</span>
                </div>
                <h3 className="text-[18px] leading-snug font-black text-black mb-4 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-black/80 line-clamp-4">
                  {stripText(blog.content)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
