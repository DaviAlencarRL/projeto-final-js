import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = "https://fdcyvmigjqtkllygjvxq.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkY3l2bWlnanF0a2xseWdqdnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODkyODAsImV4cCI6MjA5NjI2NTI4MH0.FebnThWSf9YvPeKjQhZvS0NQBceHZKh-TnIIek-kDUY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);