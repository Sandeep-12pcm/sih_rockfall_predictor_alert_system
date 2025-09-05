import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_URL = "https://hintdswgkwghahrleukm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbnRkc3dna3dnaGFocmxldWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwOTA4MzQsImV4cCI6MjA3MjY2NjgzNH0.Dp3vg9TxvAQaPQw9qDK7Qc1nKELBc1Z2y-kbaLwOBFA";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
