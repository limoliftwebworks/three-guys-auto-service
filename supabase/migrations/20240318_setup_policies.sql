-- First disable RLS
ALTER TABLE job_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_references DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow insert for job applications" ON job_applications;
DROP POLICY IF EXISTS "Allow insert for job references" ON job_references;
DROP POLICY IF EXISTS "Allow all for authenticated users on job applications" ON job_applications;
DROP POLICY IF EXISTS "Allow all for authenticated users on job references" ON job_references;
DROP POLICY IF EXISTS "Allow public uploads to resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to read own uploads from resumes" ON storage.objects;

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_references ENABLE ROW LEVEL SECURITY;

-- Create policies for job applications
CREATE POLICY "Allow insert for job applications"
    ON job_applications
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users on job applications"
    ON job_applications
    FOR ALL
    TO authenticated
    USING (true);

-- Create policies for job references
CREATE POLICY "Allow insert for job references"
    ON job_references
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users on job references"
    ON job_references
    FOR ALL
    TO authenticated
    USING (true);

-- Set up storage (handle existing objects first)
DELETE FROM storage.objects WHERE bucket_id = 'resumes';

-- Create or update the bucket
DO $$
BEGIN
    DELETE FROM storage.buckets WHERE id = 'resumes';
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
        'resumes',
        'resumes',
        false,
        10485760,  -- 10MB limit
        ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    );
EXCEPTION WHEN others THEN
    -- If we can't delete/recreate, try to update
    UPDATE storage.buckets 
    SET 
        public = false,
        file_size_limit = 10485760,
        allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    WHERE id = 'resumes';
END $$;

-- Create storage policies
CREATE POLICY "Allow public uploads to resumes"
    ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Allow public to read own uploads from resumes"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'resumes');

-- Grant necessary permissions
GRANT ALL ON job_applications TO anon;
GRANT ALL ON job_references TO anon;
GRANT ALL ON job_applications TO authenticated;
GRANT ALL ON job_references TO authenticated; 