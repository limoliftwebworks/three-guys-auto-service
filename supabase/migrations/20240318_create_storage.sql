-- Create storage bucket for resumes
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