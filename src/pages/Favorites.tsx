import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

import productTshirt from "@/assets/product-tshirt.jpg";
import productJournal from "@/assets/product-journal.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productCap from "@/assets/product-cap.jpg";
import productBottle from "@/assets/product-bottle.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/product-tshirt.jpg": productTshirt,
  "/src/assets/product-journal.jpg": productJournal,
  "/src/assets/product-bracelet.jpg": productBracelet,
  "/src/assets/product-hoodie.jpg": productHoodie,
  "/src/assets/product-cap.jpg": productCap,
  "/src/assets/product-bottle.jpg": productBottle,
};

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: favoritesData, error: favError } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", user.id);

      if (favError) throw favError;

      const productIds = favoritesData.map((f) => f.product_id);

      if (productIds.length === 0) return [];

      const { data: productsData, error: prodError } = await supabase
        .from("products")
        .select("*")
        .in("id", productIds);

      if (prodError) throw prodError;

      return productsData.map((product) => ({
        ...product,
        image: imageMap[product.image] || product.image,
        price: Number(product.price),
      }));
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center gap-6 py-16">
            <Heart className="h-24 w-24 text-muted-foreground/50" />
            <h1 className="font-display text-3xl font-bold text-foreground">
              Faça login para ver seus favoritos
            </h1>
            <Button onClick={() => navigate("/auth")} variant="cta" size="lg">
              Entrar
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <p className="text-center text-foreground/70">Carregando favoritos...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-4">
            Meus Favoritos
          </h1>
          <p className="text-foreground/70">
            {favorites && favorites.length > 0
              ? `Você tem ${favorites.length} ${favorites.length === 1 ? "produto favorito" : "produtos favoritos"}`
              : "Você ainda não tem produtos favoritos"}
          </p>
        </div>

        {favorites && favorites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                badge={product.badge}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-16">
            <Heart className="h-24 w-24 text-muted-foreground/50" />
            <p className="text-lg text-foreground/70 text-center">
              Explore nossos produtos e adicione seus favoritos clicando no ícone de
              coração!
            </p>
            <Button onClick={() => navigate("/")} variant="cta" size="lg">
              Ver Produtos
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
