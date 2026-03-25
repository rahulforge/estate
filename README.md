# EstateFlow Real Estate Platform

Modern real estate lead-generation web app built with React + Vite + Supabase.

## Features

- Public website with hero search, featured listings, filters, detail pages, contact page
- Property detail page with gallery, amenities, map, enquiry form, WhatsApp CTA, schedule visit CTA
- Secure admin login with Supabase Auth
- Admin dashboard for property CRUD, image uploads, lead management, analytics
- SEO-ready routes using dynamic metadata
- Mobile-first responsive UI and smooth motion via Framer Motion
- Vercel-compatible deployment

## Folder Structure

- `src/components` - reusable UI blocks
- `src/pages` - route pages
- `src/lib` - Supabase client, API layer, helpers
- `src/context` - auth state
- `src/data` - local seed fallback and testimonials
- `supabase/schema.sql` - database schema and policies
- `supabase/seed-demo-properties.sql` - 24 demo properties for quick testing

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy env file
   ```bash
   cp .env.example .env
   ```
   On Windows PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```
3. Fill in Supabase values in `.env`
4. In Supabase SQL editor, run `supabase/schema.sql`
5. Run the storage bucket and storage policy SQL from `supabase/schema.sql` so uploads work from the admin dashboard
6. Create an admin user in Supabase Auth using email/password
7. Start development server
   ```bash
   npm run dev
   ```

## Deploy to Vercel

- Import the project into Vercel
- Add the same `VITE_*` environment variables
- Build command: `npm run build`
- Output directory: `dist`

## Notes

- Without Supabase env variables, the public site still renders using local seed data.
- Admin write actions require Supabase credentials.
- Public lead form uses anonymous insert only; if you re-add `.select()` on insert, you will also need an anon `SELECT` policy on `leads`.
- Storage uploads require `storage.objects` policies in addition to table policies.
- Update the phone number in `.env` for WhatsApp lead capture.
