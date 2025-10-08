import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/hooks/useRole";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Package, TrendingUp } from "lucide-react";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loadingSales, setLoadingSales] = useState(true);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    image: "",
    badge: "",
  });

  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user || !isAdmin) {
        navigate("/");
      }
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total,
          status,
          created_at,
          order_items (
            quantity,
            price,
            products (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSalesData(data || []);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoadingSales(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("products").insert({
        name: productForm.name,
        price: parseFloat(productForm.price),
        image: productForm.image,
        badge: productForm.badge || null,
      });

      if (error) throw error;

      toast({
        title: "Produto cadastrado!",
        description: "O produto foi adicionado com sucesso.",
      });

      setProductForm({ name: "", price: "", image: "", badge: "" });
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar produto",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getSalesStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthSales = salesData.filter((order) => {
      const orderDate = new Date(order.created_at);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    });

    const totalMonth = monthSales.reduce((sum, order) => sum + parseFloat(order.total), 0);
    const ordersCount = monthSales.length;

    return { totalMonth, ordersCount };
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const { totalMonth, ordersCount } = getSalesStats();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="products">
              <Package className="h-4 w-4 mr-2" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="sales">
              <TrendingUp className="h-4 w-4 mr-2" />
              Vendas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cadastrar Novo Produto</CardTitle>
                <CardDescription>
                  Adicione novos produtos ao catálogo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({ ...productForm, price: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">URL da Imagem</Label>
                    <Input
                      id="image"
                      type="url"
                      value={productForm.image}
                      onChange={(e) =>
                        setProductForm({ ...productForm, image: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="badge">Badge (opcional)</Label>
                    <Input
                      id="badge"
                      value={productForm.badge}
                      onChange={(e) =>
                        setProductForm({ ...productForm, badge: e.target.value })
                      }
                      placeholder="Ex: Novo, Promoção"
                    />
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      "Cadastrar Produto"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas do Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">
                    R$ {totalMonth.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pedidos do Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{ordersCount}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total de Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{salesData.length}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Vendas</CardTitle>
                <CardDescription>Últimas vendas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSales ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : salesData.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma venda registrada ainda.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {salesData.slice(0, 10).map((order) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center border-b pb-4"
                      >
                        <div>
                          <p className="font-medium">Pedido #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            R$ {parseFloat(order.total).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
