-- Create a policy that allows users to claim unassigned projects
CREATE POLICY "Users can link to unassigned projects"
ON public.projects
FOR UPDATE
USING (user_id IS NULL)
WITH CHECK (user_id = auth.uid());