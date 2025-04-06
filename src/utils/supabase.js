/* eslint-disable no-unused-vars */
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jpfwczgefuvvoganclic.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZndjemdlZnV2dm9nYW5jbGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzkyOTMsImV4cCI6MjA1OTM1NTI5M30.74N7Ci3_veyQgyOtur5YOBl8eSsb7xS8tuxw8454niE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
