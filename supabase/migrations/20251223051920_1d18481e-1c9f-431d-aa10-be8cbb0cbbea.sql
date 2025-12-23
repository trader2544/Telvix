-- Create projects table for admin to manage client projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'review', 'completed')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_resources table for user uploads
CREATE TABLE public.project_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_messages table for chat
CREATE TABLE public.project_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_suggestions table for user change requests
CREATE TABLE public.project_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'implemented')),
  admin_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_suggestions ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Projects policies
CREATE POLICY "Admins can manage all projects" ON public.projects
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view their linked projects" ON public.projects
FOR SELECT USING (user_id = auth.uid());

-- Project resources policies
CREATE POLICY "Admins can manage all resources" ON public.project_resources
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view resources for their projects" ON public.project_resources
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_resources.project_id
    AND projects.user_id = auth.uid()
  )
);

CREATE POLICY "Users can upload resources to their projects" ON public.project_resources
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_resources.project_id
    AND projects.user_id = auth.uid()
  )
  AND user_id = auth.uid()
);

-- Project messages policies
CREATE POLICY "Admins can manage all messages" ON public.project_messages
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view messages for their projects" ON public.project_messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_messages.project_id
    AND projects.user_id = auth.uid()
  )
);

CREATE POLICY "Users can send messages to their projects" ON public.project_messages
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_messages.project_id
    AND projects.user_id = auth.uid()
  )
  AND sender_id = auth.uid()
  AND is_admin = false
);

-- Project suggestions policies
CREATE POLICY "Admins can manage all suggestions" ON public.project_suggestions
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view suggestions for their projects" ON public.project_suggestions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_suggestions.project_id
    AND projects.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create suggestions for their projects" ON public.project_suggestions
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_suggestions.project_id
    AND projects.user_id = auth.uid()
  )
  AND user_id = auth.uid()
);

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_suggestions_updated_at
BEFORE UPDATE ON public.project_suggestions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for project resources
INSERT INTO storage.buckets (id, name, public) VALUES ('project-resources', 'project-resources', false);

-- Storage policies for project resources
CREATE POLICY "Users can upload to project-resources" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-resources' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their project resources" ON storage.objects
FOR SELECT USING (bucket_id = 'project-resources' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage all project resources" ON storage.objects
FOR ALL USING (bucket_id = 'project-resources' AND public.is_admin(auth.uid()));