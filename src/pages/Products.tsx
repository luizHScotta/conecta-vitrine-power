import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

const Products = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      
      return data.map((product) => ({
        ...product,
        image: imageMap[product.image] || product.image,
        price: Number(product.price),
      }));
    },
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              TODOS OS{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                PRODUTOS
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-foreground/70">
              Escolha o que combina com você e viva sua fé com autenticidade! 🙌
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-foreground/70">Carregando produtos...</p>
              </div>
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-foreground/70">Nenhum produto encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary">
                <span className="text-xl">🔥</span>
              </div>
              <span className="font-display text-lg font-bold">LOJA JOVEM</span>
            </div>
            
            <div className="flex gap-6 text-sm text-foreground/60">
              <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-foreground transition-colors">Facebook</a>
              <a href="#" className="hover:text-foreground transition-colors">WhatsApp</a>
            </div>

            <p className="text-sm text-foreground/60">
              © 2025 Loja Jovem. Viva sua fé! 🙌
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;