import axios from "axios";
import { error } from "console";

import { supabase } from "~~/utils/supabase";

const updateSupabase = async (buyer_addr: string, seller_addr: string, token_id: number) => {
  try {
    const { data: SellerListNP } = await supabase.from("owners").select('holdings').eq('owner', seller_addr);
    const { data: BuyerListNP } = await supabase.from("owners").select('holdings').eq('owner', buyer_addr);
    if (SellerListNP && BuyerListNP) {
      await supabase.from("owners").update([{ holdings: BuyerListNP[0]?.holdings?.concat(token_id) }]).eq("owner", buyer_addr);
      await supabase.from("owners").update([{ holdings: SellerListNP[0]?.holdings?.filter((item: number) => item !== token_id) }]).eq("owner", seller_addr);
      return { success: true };
    }
  } catch (e) {
    return { error: e };
  }
}

const getSupabase = async (addr: string) => {
  const { data: Starhack, error } = await supabase
    .from("owners").select("holdings").eq("owner", addr);
  if (!Starhack || Starhack.length ==0) {
    return { error:"something went wrong" };
  } else {
    const newdata =Starhack[0].holdings
    let data:number[]=[]
    if (newdata.length>12){
      for(let i =0;i<12;i++){
        let randI=Math.floor(Math.random() * newdata.length)
        data.push(newdata[randI])
      }

    }
    else{
      data=newdata
    }
    const dataReturn: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let { data: Metadata, error } = await supabase
        .from("gamedata")
        .select("metadata")
        .eq("id", data[i]);
      if (error) {
        console.log(error);
        return { error: error.message };
      }
      if (!Metadata || Metadata.length === 0) {
        console.log("Metadata not found for ID:", data[i]);
      } else {
        const newData=(Metadata[0]?.metadata)
        newData.token_id=data[i]
        dataReturn.push(newData);
      }
    }
    return dataReturn;
  }
}

export async function POST(req: Request) {
  const formdata = await req.formData();
  const buyer_addr = String(formdata.get("buyer_addr"));
  const seller_addr = String(formdata.get("seller_addr"));
  const token_id = Number(formdata.get("token_id"));
  const addr = String(formdata.get("addr")) ? String(formdata.get("addr")) : "";
  const method = String(formdata.get("method"));

  if (!method) return new Response(JSON.stringify({ error: "Method not provided" }), { status: 400 });

  if (method === "update" && buyer_addr && seller_addr && token_id) {
    const result = await updateSupabase(buyer_addr, seller_addr, token_id);
    return new Response(JSON.stringify(result), { status: 200 });
  }

  if (method === 'get') {
    const result = await getSupabase(addr);
    return new Response(JSON.stringify(result), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
}
