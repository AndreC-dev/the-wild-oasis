import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zctkdxhvyfremwhykone.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjdGtkeGh2eWZyZW13aHlrb25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDQ2MDgsImV4cCI6MjA1OTYyMDYwOH0.TLMbz5d-cIGn3anUZ4L-hCW011kpuZ5GkPqnb6pazIw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
