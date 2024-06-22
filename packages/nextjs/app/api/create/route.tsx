import axios from "axios";
import {supabase_marketplace} from "./../../../utils/supabase"
import { error } from "console";


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
  let { data: Starhack, error } = await supabase_marketplace
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
        const {data,error}=await supabase_marketplace.from("Starhack").update([{active_listings:new_data}]).eq("id",1)
        if (error) {
          console.log(error);
          return { error };
        }
    }
    else return null
    
};

const get_activeListing = async()=>{

  let { data: Starhack, error } = await supabase_marketplace
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
