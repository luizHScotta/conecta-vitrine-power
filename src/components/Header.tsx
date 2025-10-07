import { ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary">
              <span className="text-xl font-bold text-primary-foreground">🔥</span>
            </div>
            <h1 className="text-xl font-display font-extrabold tracking-tight text-foreground md:text-2xl">
              LOJA JOVEM
            </h1>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Início
            </a>
            <a href="#produtos" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Produtos
            </a>
            <a href="#sobre" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Sobre
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
