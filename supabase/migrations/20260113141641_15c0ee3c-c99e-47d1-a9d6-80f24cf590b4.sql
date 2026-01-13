-- Create blog_categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for blog_categories
CREATE POLICY "Anyone can view categories" 
ON public.blog_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage categories" 
ON public.blog_categories 
FOR ALL 
USING (is_admin(auth.uid()));

-- Add category_id to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN category_id UUID REFERENCES public.blog_categories(id);

-- Insert some default categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Technology', 'technology', 'Latest trends in technology and software development'),
('Web Development', 'web-development', 'Tips and tutorials on web development'),
('AI & Automation', 'ai-automation', 'Artificial Intelligence and automation insights'),
('Business', 'business', 'Business strategies and digital transformation'),
('Design', 'design', 'UI/UX design trends and best practices');

-- Enable realtime for blog_categories
ALTER PUBLICATION supabase_realtime ADD TABLE blog_categories;