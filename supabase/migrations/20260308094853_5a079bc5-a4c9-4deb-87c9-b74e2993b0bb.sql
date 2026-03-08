-- Create project_issues table for admin to add issues visible to users
CREATE TABLE public.project_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  severity text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_issues ENABLE ROW LEVEL SECURITY;

-- Admin can manage all issues
CREATE POLICY "Admins can manage all issues"
  ON public.project_issues
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Users can view issues for their projects
CREATE POLICY "Users can view issues for their projects"
  ON public.project_issues
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_issues.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Trigger to auto-update updated_at
CREATE TRIGGER update_project_issues_updated_at
  BEFORE UPDATE ON public.project_issues
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();