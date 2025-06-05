-- First, disable RLS temporarily to ensure we can modify everything
ALTER TABLE job_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_references DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON job_applications;
DROP POLICY IF EXISTS "Enable insert access for all users" ON job_applications;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON job_applications;
DROP POLICY IF EXISTS "Enable read access for authenticated users on references" ON job_references;
DROP POLICY IF EXISTS "Enable insert access for all users on references" ON job_references;
DROP POLICY IF EXISTS "Enable public uploads to resumes bucket" ON storage.objects;
DROP POLICY IF EXISTS "Enable authenticated downloads from resumes bucket" ON storage.objects;

-- Re-enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_references ENABLE ROW LEVEL SECURITY;

-- Create a more permissive policy for job applications
CREATE POLICY "Allow all operations for job applications"
    ON job_applications
    AS PERMISSIVE
    FOR ALL
    TO public
    USING (true)
    WITH CHECK (true);

-- Create a more permissive policy for job references
CREATE POLICY "Allow all operations for job references"
    ON job_references
    AS PERMISSIVE
    FOR ALL
    TO public
    USING (true)
    WITH CHECK (true);

-- Create a more permissive policy for resume storage
CREATE POLICY "Allow all operations for resumes storage"
    ON storage.objects
    AS PERMISSIVE
    FOR ALL
    TO public
    USING (bucket_id = 'resumes')
    WITH CHECK (bucket_id = 'resumes');

-- Ensure the resumes bucket exists and is configured correctly
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('resumes', 'resumes', false, 10485760)  -- 10MB limit
ON CONFLICT (id) DO UPDATE
SET file_size_limit = 10485760; 