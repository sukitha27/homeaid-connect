-- Create enum types for consistent data
CREATE TYPE damage_level AS ENUM ('minor', 'partial', 'severe', 'total_loss');
CREATE TYPE request_status AS ENUM ('pending', 'verified', 'assigned', 'in_progress', 'completed', 'rejected');
CREATE TYPE donation_type AS ENUM ('materials', 'funds', 'sponsorship');
CREATE TYPE volunteer_skill AS ENUM ('carpentry', 'masonry', 'electrical', 'plumbing', 'painting', 'roofing', 'welding', 'helper');
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  district TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User roles table for RBAC
CREATE TYPE app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);

-- Victims table
CREATE TABLE public.victims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  district TEXT NOT NULL,
  gn_division TEXT NOT NULL,
  address TEXT NOT NULL,
  family_size INTEGER NOT NULL DEFAULT 1,
  damage_level damage_level NOT NULL DEFAULT 'partial',
  damage_description TEXT,
  urgent_needs TEXT[],
  images TEXT[],
  status approval_status NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Donors table
CREATE TABLE public.donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  organization TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  donation_type donation_type NOT NULL,
  preferred_districts TEXT[],
  materials_offered TEXT[],
  amount_offered DECIMAL(12,2),
  is_anonymous BOOLEAN DEFAULT false,
  status approval_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Volunteers table
CREATE TABLE public.volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  age INTEGER,
  address TEXT,
  skills volunteer_skill[] NOT NULL,
  experience_years INTEGER DEFAULT 0,
  preferred_districts TEXT[],
  availability TEXT[],
  has_transport BOOLEAN DEFAULT false,
  has_tools BOOLEAN DEFAULT false,
  motivation TEXT,
  status approval_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects table (repair tasks)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  victim_id UUID REFERENCES public.victims(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status request_status NOT NULL DEFAULT 'pending',
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date DATE,
  estimated_completion DATE,
  actual_completion DATE,
  total_budget DECIMAL(12,2) DEFAULT 0,
  amount_spent DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project volunteer assignments
CREATE TABLE public.project_volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  volunteer_id UUID REFERENCES public.volunteers(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'assigned',
  UNIQUE(project_id, volunteer_id)
);

-- Project donor contributions
CREATE TABLE public.project_donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  donor_id UUID REFERENCES public.donors(id) ON DELETE CASCADE NOT NULL,
  contribution_type donation_type NOT NULL,
  amount DECIMAL(12,2),
  materials TEXT[],
  contributed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Project updates for progress tracking
CREATE TABLE public.project_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  update_text TEXT NOT NULL,
  progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  images TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.victims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.is_admin());

-- Victims policies - public can submit, authenticated can view own, admins can manage
CREATE POLICY "Anyone can submit victim request" ON public.victims
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own submissions" ON public.victims
  FOR SELECT USING (submitted_by = auth.uid());

CREATE POLICY "Admins can manage all victims" ON public.victims
  FOR ALL USING (public.is_admin());

CREATE POLICY "Public can view approved victims" ON public.victims
  FOR SELECT USING (status = 'approved');

-- Donors policies
CREATE POLICY "Anyone can register as donor" ON public.donors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own donor profile" ON public.donors
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own donor profile" ON public.donors
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all donors" ON public.donors
  FOR ALL USING (public.is_admin());

CREATE POLICY "Public can view approved donors" ON public.donors
  FOR SELECT USING (status = 'approved' AND is_anonymous = false);

-- Volunteers policies
CREATE POLICY "Anyone can register as volunteer" ON public.volunteers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own volunteer profile" ON public.volunteers
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own volunteer profile" ON public.volunteers
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all volunteers" ON public.volunteers
  FOR ALL USING (public.is_admin());

CREATE POLICY "Public can view approved volunteers" ON public.volunteers
  FOR SELECT USING (status = 'approved');

-- Projects policies
CREATE POLICY "Public can view projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL USING (public.is_admin());

-- Project volunteers policies
CREATE POLICY "Public can view project volunteers" ON public.project_volunteers
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage project volunteers" ON public.project_volunteers
  FOR ALL USING (public.is_admin());

-- Project donors policies
CREATE POLICY "Public can view project donors" ON public.project_donors
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage project donors" ON public.project_donors
  FOR ALL USING (public.is_admin());

-- Project updates policies
CREATE POLICY "Public can view project updates" ON public.project_updates
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage project updates" ON public.project_updates
  FOR ALL USING (public.is_admin());

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_victims_updated_at
  BEFORE UPDATE ON public.victims
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_donors_updated_at
  BEFORE UPDATE ON public.donors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at
  BEFORE UPDATE ON public.volunteers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();