import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

import productTshirt from "@/assets/product-tshirt.jpg";
import productJournal from "@/assets/product-journal.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productCap from "@/assets/product-cap.jpg";
import productBottle from "@/assets/product-bottle.jpg";

const products = [
  {
    id: 1,
    name: "Camiseta Fé Ousada",
    price: 79.90,
    image: productTshirt,
    badge: "Novo",
  },
  {
    id: 2,
    name: "Diário de Gratidão",
    price: 45.90,
    image: productJournal,
  },
  {
    id: 3,
    name: "Pulseira da Fé",
    price: 29.90,
    image: productBracelet,
    badge: "🔥",
  },
  {
    id: 4,
    name: "Moletom Adoração",
    price: 149.90,
    image: productHoodie,
  },
  {
    id: 5,
    name: "Boné Jovem Gospel",
    price: 59.90,
    image: productCap,
  },
  {
    id: 6,
    name: "Garrafa Motivacional",
    price: 39.90,
    image: productBottle,
    badge: "Top",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      <section id="produtos" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              NOSSOS{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                PRODUTOS
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground/70">
              Escolha o que combina com você e viva sua fé com autenticidade! 🙌
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="text-primary hover:text-primary/80 font-semibold transition-colors">
              Ver todos os produtos →
            </button>
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

export default Index;
