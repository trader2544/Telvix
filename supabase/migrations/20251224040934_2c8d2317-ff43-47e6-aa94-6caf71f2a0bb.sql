-- Add website_url column to projects table
ALTER TABLE public.projects 
ADD COLUMN website_url text NULL;