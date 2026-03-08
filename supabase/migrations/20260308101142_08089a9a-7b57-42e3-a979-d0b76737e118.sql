-- Allow users to report issues on their own projects
CREATE POLICY "Users can report issues for their projects"
ON public.project_issues FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_issues.project_id
    AND projects.user_id = auth.uid()
  )
);