-- Create email subscribers table
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (subscribe)
CREATE POLICY "Anyone can subscribe" ON public.email_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only allow service role to select/update/delete (admin operations)
-- The anon key cannot read subscribers, but the service role can
CREATE POLICY "Service role can manage subscribers" ON public.email_subscribers
  FOR ALL
  USING (auth.role() = 'service_role');
