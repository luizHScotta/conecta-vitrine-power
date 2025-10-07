-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT NOT NULL,
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view products)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Insert the existing products
INSERT INTO public.products (name, price, image, badge) VALUES
  ('Camiseta Fé Ousada', 79.90, '/src/assets/product-tshirt.jpg', 'Novo'),
  ('Diário de Gratidão', 45.90, '/src/assets/product-journal.jpg', NULL),
  ('Pulseira da Fé', 29.90, '/src/assets/product-bracelet.jpg', '🔥'),
  ('Moletom Adoração', 149.90, '/src/assets/product-hoodie.jpg', NULL),
  ('Boné Jovem Gospel', 59.90, '/src/assets/product-cap.jpg', NULL),
  ('Garrafa Motivacional', 39.90, '/src/assets/product-bottle.jpg', 'Top');