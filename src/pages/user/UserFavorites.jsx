import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, ChefHat, Heart, Loader2, Trash2 } from "lucide-react";
import { getFavorites, deleteFavorite, deleteFavoriteBlog } from "../../services/favoriteService";
import { resolveImageUrl } from "../../services/contentService";
import { stripText } from "../../utils/text";

export default function UserFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const fetchFavorites = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getFavorites();
      setFavorites(res.data.data || []);
    } catch (err) {
      console.error("Gagal mengambil favorite:", err);
      setError("Favorite belum bisa dimuat. Pastikan kamu sudah login.");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const filteredFavorites = useMemo(() => {
    const q = keyword.trim().toLowerCase();

    const data = favorites.map((favorite) => {
      const recipe = favorite.Recipe || favorite.recipe || {};
      const blog = favorite.Blog || favorite.blog || {};

      return {
        ...favorite,
        recipe,
        blog,
      };
    });

    if (!q) return data;

    return data.filter((favorite) => {
      const recipeText = `${favorite.recipe.title || ""} ${favorite.recipe.category || ""} ${favorite.recipe.details || ""}`;
      const blogText = `${favorite.blog.title || ""} ${favorite.blog.category || ""} ${favorite.blog.content || ""}`;

      return `${recipeText} ${blogText}`.toLowerCase().includes(q);
    });
  }, [favorites, keyword]);

  const favoriteRecipes = filteredFavorites.filter((favorite) => favorite.recipe_id);
  const favoriteBlogs = filteredFavorites.filter((favorite) => favorite.blog_id);

  const handleDeleteFavorite = async (favorite) => {
    try {
      if (favorite.blog_id) {
        await deleteFavoriteBlog(favorite.id);
      } else {
        await deleteFavorite(favorite.id);
      }

      fetchFavorites();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menghapus favorite");
    }
  };

  return (
    <section className="pt-3 w-full">
      <div className="grid lg:grid-cols-[minmax(0,720px)_1fr] gap-10 items-end mb-10">
        <div>
          <h1 className="text-[28px] font-black text-black mb-7">Favorite</h1>
          <p className="text-[18px] leading-[1.45] text-black">
            Daftar resep yang kamu simpan sebagai favorite. Tampilan dibuat seperti halaman resep agar mudah dibaca dan dibuka kembali.
          </p>
        </div>
        <div className="hidden lg:flex justify-end">
          <div className="bg-white rounded-3xl px-7 py-5 shadow-sm border border-slate-100 min-w-[260px]">
            <p className="text-sm text-slate-500">Total Favorite</p>
            <h2 className="text-4xl font-black text-[#10BB89] mt-1">{favorites.length}</h2>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[280px] flex items-center justify-center text-slate-500 gap-3">
          <Loader2 className="animate-spin" /> Memuat favorite...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-red-100 p-6 text-red-500 flex items-start gap-3">
          <AlertCircle /> <span>{error}</span>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-slate-500">
          Belum ada favorite.
        </div>
      ) : (
        <div className="space-y-12">
          <div>
            <div className="flex items-center justify-between gap-5 mb-7">
              <h2 className="text-[28px] font-black text-black">Artikel Favorite</h2>
            </div>

            {favoriteBlogs.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
                Belum ada artikel favorite.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {favoriteBlogs.map((favorite) => {
                  const blog = favorite.Blog || favorite.blog || favorite.blog || {};
                  return (
                    <div key={favorite.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 min-h-[305px] flex flex-col relative group">
                      <Link to={`/dashboard/articles/${blog.id}`} className="block">
                        <img
                          src={resolveImageUrl(blog.image_url, "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80")}
                          alt={blog.title}
                          className="h-[170px] w-full object-cover bg-slate-200"
                        />
                      </Link>

                      <button
                        onClick={() => handleDeleteFavorite(favorite)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/90 text-red-500 flex items-center justify-center shadow hover:bg-red-50"
                        title="Hapus favorite"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-[11px] font-bold uppercase text-[#10BB89] flex items-center gap-1 mb-3">
                          <Heart size={14} /> {blog.category || "Artikel sehat"}
                        </span>

                        <Link to={`/dashboard/articles/${blog.id}`}>
                          <h3 className="text-[18px] leading-snug font-black text-black mb-4 line-clamp-2 hover:text-[#10BB89]">
                            {blog.title}
                          </h3>
                        </Link>

                        <p className="text-[12px] leading-relaxed text-black/80 line-clamp-4">
                          {stripText(blog.content)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-5 mb-7">
              <h2 className="text-[28px] font-black text-black">Resep Favorite</h2>
            </div>

            {favoriteRecipes.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
                Belum ada resep favorite.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {favoriteRecipes.map((favorite) => {
                  const recipe = favorite.Recipe || favorite.recipe || {};
                  return (
                    <div key={favorite.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 min-h-[305px] flex flex-col relative group">
                      <Link to={`/dashboard/recipes/${recipe.id}`} className="block">
                        <img
                          src={resolveImageUrl(recipe.image_url, "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80")}
                          alt={recipe.title}
                          className="h-[170px] w-full object-cover bg-slate-200"
                        />
                      </Link>

                      <button
                        onClick={() => handleDeleteFavorite(favorite)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/90 text-red-500 flex items-center justify-center shadow hover:bg-red-50"
                        title="Hapus favorite"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-[11px] font-bold uppercase text-[#10BB89] flex items-center gap-1 mb-3">
                          <ChefHat size={14} /> {recipe.category || "Resep sehat"}
                        </span>

                        <Link to={`/dashboard/recipes/${recipe.id}`}>
                          <h3 className="text-[18px] leading-snug font-black text-black mb-4 line-clamp-2 hover:text-[#10BB89]">
                            {recipe.title}
                          </h3>
                        </Link>

                        <p className="text-[12px] leading-relaxed text-black/80 line-clamp-4">
                          {stripText(recipe.details)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
