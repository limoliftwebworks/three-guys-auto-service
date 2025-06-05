-- Drop the existing table if it exists
DROP TABLE IF EXISTS appointments;

-- Create the appointments table with the correct structure
CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    appointment_date TIMESTAMPTZ NOT NULL,
    service_type TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled',
    car_make TEXT,
    car_model TEXT,
    timezone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
); 