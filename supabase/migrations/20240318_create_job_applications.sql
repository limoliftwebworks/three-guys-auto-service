-- Create enum for application status
CREATE TYPE application_status AS ENUM ('new', 'reviewing', 'interviewed', 'offered', 'hired', 'rejected');

-- Create job applications table
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

-- Create references table
CREATE TABLE job_references (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for job_applications
CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS (Row Level Security) policies
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_references ENABLE ROW LEVEL SECURITY;

-- Allow public to insert applications and references
CREATE POLICY "Allow public to insert job applications"
    ON job_applications
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Allow public to insert references"
    ON job_references
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow authenticated users (admin) to view and manage applications
CREATE POLICY "Allow authenticated to view job applications"
    ON job_applications
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated to update job applications"
    ON job_applications
    FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated to view references"
    ON job_references
    FOR SELECT
    TO authenticated
    USING (true);

-- Create storage policies for resumes bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Allow public to upload resumes
CREATE POLICY "Allow public to upload resumes"
    ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (
        bucket_id = 'resumes' 
        AND (storage.foldername(name))[1] = 'resumes'
        AND (lower(storage.extension(name)) = 'pdf' 
             OR lower(storage.extension(name)) = 'doc' 
             OR lower(storage.extension(name)) = 'docx')
        AND octet_length(DECODE(SUBSTRING(storage.get_header(request_header, 'content-type'), 9), 'base64')) <= 10485760
    );

-- Allow authenticated users to view resumes
CREATE POLICY "Allow authenticated to view resumes"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'resumes');

-- Create types for Typescript
COMMENT ON TABLE job_applications IS E'@typescript-interface JobApplication\n@typescript-include-props created_at updated_at';
COMMENT ON TABLE job_references IS E'@typescript-interface JobReference\n@typescript-include-props created_at'; 