import axios from "axios";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mmrrmleeydqgkmkncqan.supabase.co"
const supabasekey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcnJtbGVleWRxZ2tta25jcWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5ODMxODEsImV4cCI6MjAzNDU1OTE4MX0.4BokD3hAhtepArvEK6Wzosr0LSVsIrkX25uj4Y_R8x4'
const supabase = createClient(supabaseUrl,supabasekey)

const launchToken = async (token_supply:Number,
    token_name:String,
    symbol:String,
    addr:String) => {


  };

export async function POST(req: Request) {
    const formdata = await req.formData()
    const token_supply = Number(formdata.get("supply"))
    const token_name = String(formdata.get("name"))
    const symbol = String(formdata.get("symbol"))
    const addr =String( formdata.get("addr"))

    const res = await launchToken(token_supply,
        token_name,
        symbol,
        addr)
    return Response.json(res)
}