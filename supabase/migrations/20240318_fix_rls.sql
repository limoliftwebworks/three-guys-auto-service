-- First, let's completely reset everything
DROP TABLE IF EXISTS job_references;
DROP TABLE IF EXISTS job_applications;
DROP TYPE IF EXISTS application_status;

-- Recreate the type
CREATE TYPE application_status AS ENUM ('new', 'reviewing', 'interviewed', 'offered', 'hired', 'rejected');

-- Recreate tables
CREATE TABLE job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    years_experience INTEGER NOT NULL,
    position TEXT NOT NULL,
    resume_url TEXT NOT NULL,
    status application_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE job_references (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Disable RLS to start fresh
ALTER TABLE job_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_references DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow all operations for job applications" ON job_applications;
DROP POLICY IF EXISTS "Allow all operations for job references" ON job_references;
DROP POLICY IF EXISTS "Allow all operations for resumes storage" ON storage.objects;

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_references ENABLE ROW LEVEL SECURITY;

-- Create simple insert-only policies for public access
CREATE POLICY "Allow insert for job applications"
    ON job_applications
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Allow insert for job references"
    ON job_references
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create policies for authenticated users
CREATE POLICY "Allow all for authenticated users on job applications"
    ON job_applications
    FOR ALL
    TO authenticated
    USING (true);

CREATE POLICY "Allow all for authenticated users on job references"
    ON job_references
    FOR ALL
    TO authenticated
    USING (true);

-- Set up storage (handle existing objects first)
DELETE FROM storage.objects WHERE bucket_id = 'resumes';
DELETE FROM storage.buckets WHERE id = 'resumes';

-- Create the bucket with proper configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'resumes',
    'resumes',
    false,
    10485760,  -- 10MB limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Create storage policies
DROP POLICY IF EXISTS "Allow public uploads to resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to read own uploads from resumes" ON storage.objects;

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