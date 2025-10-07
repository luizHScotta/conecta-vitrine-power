import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <ShoppingBag className="mx-auto h-24 w-24 text-foreground/30 mb-6" />
              <h1 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                SEU CARRINHO ESTÁ VAZIO
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-foreground/70 mb-8">
                Adicione produtos incríveis ao seu carrinho e viva sua fé com estilo!
              </p>
              <Button variant="cta" size="lg" onClick={() => navigate("/produtos")}>
                Explorar Produtos
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              MEU{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                CARRINHO
              </span>
            </h1>
            <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto">
              Limpar Carrinho
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 sm:h-24 w-full sm:w-24 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-lg font-bold text-primary">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0">
                    <p className="text-sm text-foreground/70">Subtotal</p>
                    <p className="text-xl font-bold text-primary">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  Resumo do Pedido
                </h2>
                <div className="space-y-2 border-b border-border pb-4">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Frete</span>
                    <span>Grátis</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <Button variant="cta" className="mt-6 w-full" size="lg">
                  Finalizar Compra
                </Button>
                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={() => navigate("/produtos")}
                >
                  Continuar Comprando
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;