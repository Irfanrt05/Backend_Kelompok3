import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, ChefHat, Flame, Loader2 } from "lucide-react";
import { getPublicRecipes, resolveImageUrl } from "../../services/contentService";
import { stripText } from "../../utils/text";

export default function UserRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getPublicRecipes();
        setRecipes(res.data.data || res.data.recipes || []);
      } catch (err) {
        console.error("Gagal mengambil resep user:", err);
        setError("Resep belum bisa dimuat. Pastikan backend berjalan dan endpoint /api/recipes aktif.");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter((recipe) =>
      `${recipe.title || ""} ${recipe.category || ""} ${recipe.details || ""}`.toLowerCase().includes(q),
    );
  }, [recipes, keyword]);

  return (
    <section className="pt-3 w-full">
      <div className="grid lg:grid-cols-[minmax(0,720px)_1fr] gap-10 items-end mb-10">
        <div>
          <h1 className="text-[28px] font-black text-black mb-7">Resep</h1>
          <p className="text-[18px] leading-[1.45] text-black">
            Temukan pilihan resep makanan sehat yang dapat membantu menjaga pola makan harian. Data resep diambil langsung dari backend dan dapat dikelola oleh admin.
          </p>
        </div>
        <div className="hidden lg:flex justify-end">
          <div className="bg-white rounded-3xl px-7 py-5 shadow-sm border border-slate-100 min-w-[260px]">
            <p className="text-sm text-slate-500">Total Resep</p>
            <h2 className="text-4xl font-black text-[#10BB89] mt-1">{recipes.length}</h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 mb-9">
        <h2 className="text-[28px] font-black text-black">Top Resep</h2>
        {keyword && <p className="text-sm text-slate-500">Hasil pencarian: <b>{keyword}</b></p>}
      </div>

      {loading ? (
        <div className="h-[280px] flex items-center justify-center text-slate-500 gap-3">
          <Loader2 className="animate-spin" /> Memuat resep...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-red-100 p-6 text-red-500 flex items-start gap-3">
          <AlertCircle /> <span>{error}</span>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-slate-500">
          Tidak ada resep yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredRecipes.map((recipe) => (
            <Link
              to={`/dashboard/recipes/${recipe.id}`}
              key={recipe.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-200 min-h-[305px] flex flex-col"
            >
              <img
                src={resolveImageUrl(recipe.image_url, "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80")}
                alt={recipe.title}
                className="h-[170px] w-full object-cover bg-slate-200"
              />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase text-[#10BB89] flex items-center gap-1">
                    <ChefHat size={14} /> {recipe.category || "Resep sehat"}
                  </span>
                  {recipe.calories ? (
                    <span className="text-[11px] text-orange-500 font-bold flex items-center gap-1">
                      <Flame size={14} /> {recipe.calories} kcal
                    </span>
                  ) : null}
                </div>
                <h3 className="text-[18px] leading-snug font-black text-black mb-4 line-clamp-2">
                  {recipe.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-black/80 line-clamp-4">
                  {stripText(recipe.details)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
