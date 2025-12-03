-- Fix RLS policies to protect PII - remove public access to sensitive data

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Public can view approved victims" ON victims;
DROP POLICY IF EXISTS "Public can view approved donors" ON donors;
DROP POLICY IF EXISTS "Public can view approved volunteers" ON volunteers;

-- Create restricted policies for authenticated users only
CREATE POLICY "Authenticated can view approved victims"
ON victims FOR SELECT
TO authenticated
USING (status = 'approved');

CREATE POLICY "Authenticated can view approved donors"
ON donors FOR SELECT
TO authenticated
USING (status = 'approved' AND is_anonymous = false);

CREATE POLICY "Authenticated can view approved volunteers"
ON volunteers FOR SELECT
TO authenticated
USING (status = 'approved');