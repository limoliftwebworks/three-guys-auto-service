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
    resume_url TEXT,
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

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_references ENABLE ROW LEVEL SECURITY;

-- Create policies for job_applications
CREATE POLICY "Enable read access for authenticated users"
    ON job_applications FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert access for all users"
    ON job_applications FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
    ON job_applications FOR UPDATE
    TO authenticated
    USING (true);

-- Create policies for job_references
CREATE POLICY "Enable read access for authenticated users on references"
    ON job_references FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert access for all users on references"
    ON job_references FOR INSERT
    TO public
    WITH CHECK (true);

-- Storage bucket policies
CREATE POLICY "Enable public uploads to resumes bucket"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Enable authenticated downloads from resumes bucket"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'resumes');

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING; 