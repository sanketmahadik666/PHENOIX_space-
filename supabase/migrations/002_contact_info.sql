-- Create contact_settings table
CREATE TABLE IF NOT EXISTS public.contact_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    type TEXT NOT NULL CHECK (
        type IN (
            'phone',
            'email',
            'link',
            'whatsapp',
            'instagram',
            'linkedin',
            'facebook',
            'twitter',
            'youtube'
        )
    ),
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable RLS
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
-- Policies
-- Public can read visible settings
CREATE POLICY "Public read access" ON public.contact_settings FOR
SELECT USING (true);
-- Admins can do everything
CREATE POLICY "Admin full access" ON public.contact_settings FOR ALL USING (
    auth.role() = 'authenticated'
    AND auth.jwt()->>'email' IN ('admin@elegant.ae', 'super@elegant.ae')
);
-- Insert some default data
INSERT INTO public.contact_settings (label, value, type, is_visible)
VALUES (
        'Support Phone',
        '+971-50-123-4567',
        'phone',
        true
    ),
    (
        'General Inquiries',
        'info@elegant.ae',
        'email',
        true
    ),
    (
        'WhatsApp Support',
        '+971-50-123-4567',
        'whatsapp',
        true
    ),
    (
        'Instagram',
        'https://instagram.com/eleganttraining',
        'instagram',
        true
    );