import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Heart } from "lucide-react";
import { getPublicBlogById, resolveImageUrl } from "../../services/contentService";
import { logArticleVisit } from "../../services/visitService";
import { formatDateIndonesia } from "../../utils/dateTime";
import { addFavoriteBlog } from "../../services/favoriteService";

export default function UserArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const detailRes = await getPublicBlogById(id);
        setArticle(detailRes.data.data || detailRes.data.blog || detailRes.data);
        logArticleVisit(id).catch(() => null);
      } catch (err) {
        console.error("Gagal mengambil detail artikel:", err);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const handleFavorite = async () => {
    try {
      await addFavoriteBlog(article.id);
      alert("Artikel berhasil ditambahkan ke favorite.");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menambahkan favorite.");
    }
  }; 

  if (loading) {
    return (
      <div className="h-[420px] flex items-center justify-center text-slate-500 gap-3">
        <Loader2 className="animate-spin" /> Memuat detail artikel...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        <h1 className="text-2xl font-black mb-3">Artikel tidak ditemukan</h1>
        <Link to="/dashboard/articles" className="text-[#10BB89] font-bold underline">
          Kembali ke artikel
        </Link>
      </div>
    );
  }

  return (
    <section className="pt-2 max-w-[1120px] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-7 inline-flex items-center gap-2 text-slate-500 hover:text-[#10BB89] font-bold"
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      
      <article className="bg-white rounded-[28px] p-8 md:p-10 shadow-sm border border-slate-100">
        <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-[#10BB89] mb-3 uppercase">
          {article.category || "Artikel"}
        </p>
          <button
            onClick={handleFavorite}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#10BB89] px-5 py-3 text-sm font-black text-white hover:bg-[#0E9F75] topri"
          >
            <Heart size={18} /> Tambahkan ke Favorite
          </button>
        </div>

        <h1 className="text-[30px] md:text-[40px] leading-tight font-black text-black mb-4 max-w-[900px]">
          {article.title}
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          {formatDateIndonesia(article.published_at || article.createdAt)} WIB
        </p>
        <img
          src={resolveImageUrl(article.image_url)}
          alt={article.title}
          className="w-full max-h-[360px] object-cover rounded-2xl bg-slate-200 mb-9"
        />
        <div className="text-[16px] leading-8 text-black whitespace-pre-line max-w-[900px]">
          {article.content}
        </div>
      </article>
    </section>
  );
}
