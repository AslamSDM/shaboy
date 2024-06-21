
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL??"",
  process.env.SUPABASE_KEY??""
)

export const supabase_marketplace=createClient("https://mmrrmleeydqgkmkncqan.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcnJtbGVleWRxZ2tta25jcWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5ODMxODEsImV4cCI6MjAzNDU1OTE4MX0.4BokD3hAhtepArvEK6Wzosr0LSVsIrkX25uj4Y_R8x4")
