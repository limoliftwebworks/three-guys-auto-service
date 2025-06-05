-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to insert job applications" ON job_applications;
DROP POLICY IF EXISTS "Allow public to insert references" ON job_references;
DROP POLICY IF EXISTS "Allow authenticated to view job applications" ON job_applications;
DROP POLICY IF EXISTS "Allow authenticated to update job applications" ON job_applications;
DROP POLICY IF EXISTS "Allow authenticated to view references" ON job_references;
DROP POLICY IF EXISTS "Allow public to upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated to view resumes" ON storage.objects;

-- Create new policies for job_applications
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

-- Create new policies for job_references
CREATE POLICY "Enable read access for authenticated users on references"
    ON job_references FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert access for all users on references"
    ON job_references FOR INSERT
    TO public
    WITH CHECK (true);

-- Create new storage bucket policies
CREATE POLICY "Enable public uploads to resumes bucket"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Enable authenticated downloads from resumes bucket"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'resumes'); 