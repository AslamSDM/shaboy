import axios from "axios";

import { createClient } from "@supabase/supabase-js";
import { error } from "console";

const supabaseUrl = "https://mmrrmleeydqgkmkncqan.supabase.co";
const supabasekey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcnJtbGVleWRxZ2tta25jcWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5ODMxODEsImV4cCI6MjAzNDU1OTE4MX0.4BokD3hAhtepArvEK6Wzosr0LSVsIrkX25uj4Y_R8x4";
const supabase = createClient(supabaseUrl, supabasekey);


const get_newData=(current_data:number[],token_id:number,method:string)=>{
    let new_data=current_data
    if(method==="add"){
        new_data.push(token_id)
    }
    else if(method==="remove"){
        new_data=new_data.filter(item=>item!==token_id)
    }
    return new_data

}


const updateSupabase = async (token_id: number,method:string) => {
  let { data: Starhack, error } = await supabase
    .from("Starhack")
    .select("active_listings")
    .eq("id", 1);
    if (error) {
      console.log(error);
      return { error };
    }
    else if (Starhack){
        const current_data= (Starhack[0]?.active_listings)
        const new_data=get_newData(current_data,token_id,method)
        console.log(typeof(new_data))
        const {data,error}=await supabase.from("Starhack").update([{active_listings:new_data}]).eq("id",1)
        if (error) {
          console.log(error);
          return { error };
        }
    }
    else return null
    
};

const get_activeListing = async()=>{

  let { data: Starhack, error } = await supabase
    .from("Starhack")
    .select("active_listings")
    .eq("id", 1);
    if (error) {
      console.log(error);
      return { error };
    }
    if (Starhack){
        return Starhack[0]?.active_listings
    }
    else {
        return null
    }
}

export async function POST(req: Request) {
  const formdata = await req.formData();
  const token_id = Number(formdata.get("token_id"));
  const method = String(formdata.get("method"))
  if (!method || !token_id){
    return error
  }
    if (method=="get"){
        return Response.json(await get_activeListing())
    }
    else
 { const res = await updateSupabase(token_id,method);
  return Response.json(res);}
}
