import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        image: imageMap[data.image] || data.image,
        price: Number(data.price),
      };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-foreground/70">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-foreground/70">Produto não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-12 lg:py-16 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 md:mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para produtos
        </Button>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-muted max-w-2xl mx-auto lg:max-w-none">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.badge && (
              <div className="absolute right-3 top-3 md:right-4 md:top-4 rounded-full bg-accent px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-md">
                {product.badge}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
                R$ {product.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-bold text-foreground">Descrição</h2>
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                Produto de alta qualidade para você viver sua fé com autenticidade. 
                Material confortável e durável, perfeito para o dia a dia.
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-bold text-foreground">Especificações</h2>
              <ul className="space-y-2 text-sm md:text-base text-foreground/70">
                <li>• Material de alta qualidade</li>
                <li>• Design exclusivo</li>
                <li>• Confortável para uso diário</li>
                <li>• Produto oficial</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
              <Button 
                variant="cta" 
                size="lg" 
                className="flex-1 gap-2 h-12 md:h-auto"
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })}
              >
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 sm:w-auto w-full h-12 md:h-auto"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                {isFavorite(product.id) ? 'Favoritado' : 'Favoritar'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
