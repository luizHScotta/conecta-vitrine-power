import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string | null;
}

const ProductCard = ({ name, price, image, badge }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {badge && (
            <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-md">
              {badge}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 bottom-3 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110"
          >
            <Heart className="h-5 w-5 text-primary" />
          </Button>
        </div>

        <div className="p-4">
          <h3 className="font-display text-lg font-bold text-card-foreground mb-2 line-clamp-2">
            {name}
          </h3>
          
          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">
                R$ {price.toFixed(2)}
              </span>
            </div>
            <Button variant="cta" size="sm" className="gap-1">
              <ShoppingCart className="h-4 w-4" />
              Comprar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
