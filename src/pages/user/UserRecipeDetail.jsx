import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChefHat, Flame, Heart, Loader2 } from "lucide-react";
import { getPublicRecipeById, resolveImageUrl } from "../../services/contentService";
import { addFavoriteRecipe } from "../../services/favoriteService";
import { logRecipeVisit } from "../../services/visitService";

export default function UserRecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setMessage("");
      try {
        const detailRes = await getPublicRecipeById(id);
        setRecipe(detailRes.data.data || detailRes.data.recipe || detailRes.data);
        logRecipeVisit(id).catch(() => null);
      } catch (err) {
        console.error("Gagal mengambil detail resep:", err);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const handleFavorite = async () => {
    try {
      await addFavoriteRecipe(recipe.id);
      setMessage("Resep berhasil ditambahkan ke favorite.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Gagal menambahkan favorite.");
    }
  };

  if (loading) {
    return (
      <div className="h-[420px] flex items-center justify-center text-slate-500 gap-3">
        <Loader2 className="animate-spin" /> Memuat detail resep...
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        <h1 className="text-2xl font-black mb-3">Resep tidak ditemukan</h1>
        <Link to="/dashboard/recipes" className="text-[#10BB89] font-bold underline">
          Kembali ke resep
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[#10BB89] uppercase">
              <ChefHat size={18} /> {recipe.category || "Resep sehat"}
            </span>
            {recipe.calories ? (
              <span className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 bg-orange-50 rounded-full px-4 py-2">
                <Flame size={16} /> {recipe.calories} kcal
              </span>
            ) : null}
          </div>
          <button
            onClick={handleFavorite}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#10BB89] px-5 py-3 text-sm font-black text-white hover:bg-[#0E9F75]"
          >
            <Heart size={18} /> Favorite
          </button>
        </div>

        <h1 className="text-[30px] md:text-[40px] leading-tight font-black text-black mb-6 max-w-[900px]">
          {recipe.title}
        </h1>

        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-3 text-sm font-bold text-[#10BB89]">
            {message}
          </div>
        )}

        <img
          src={resolveImageUrl(recipe.image_url, "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80")}
          alt={recipe.title}
          className="w-full max-h-[360px] object-cover rounded-2xl bg-slate-200 mb-9"
        />

        <div className="text-[16px] leading-8 text-black whitespace-pre-line max-w-[900px]">
          {recipe.details || "Detail resep belum tersedia."}
        </div>
      </article>
    </section>
  );
}
