-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Personal Info
  name TEXT NOT NULL,
  personal_email TEXT NOT NULL UNIQUE,
  college_email TEXT,
  
  -- Social Media
  github_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  other_social TEXT,
  
  -- Screening Questions
  tried_vibe_coding BOOLEAN NOT NULL DEFAULT false,
  vibe_coding_projects TEXT,
  realtime_impact TEXT,
  vibe_coding_process TEXT,
  anything_to_say TEXT
);

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- No public access - only admin via service role can read
CREATE POLICY "No public access to registrations"
ON public.registrations
FOR SELECT
USING (false);

-- Allow anyone to insert (for registration)
CREATE POLICY "Anyone can register"
ON public.registrations
FOR INSERT
WITH CHECK (true);

-- No updates allowed (registration is final)
CREATE POLICY "No updates to registrations"
ON public.registrations
FOR UPDATE
USING (false);

-- No deletes allowed publicly
CREATE POLICY "No public deletes"
ON public.registrations
FOR DELETE
USING (false);