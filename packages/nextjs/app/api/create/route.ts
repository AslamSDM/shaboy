import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";
import { error } from "console";



const updateSupabase = async (token_id: number, method: string, seller_address: string, price: number) => {
  try {
    await supabase
      .from("marketplace")
      .select("tokenid")
    if (method == "add") {
      await supabase
        .from("marketplace")
        .insert([{ seller: seller_address, price: price, tokenid: token_id }])
    }
    if (method == "remove") {
      await supabase
        .from("marketplace")
        .delete().eq("tokenid", token_id)
    }
    return {error:null}
  } catch (e) {
    return {error:e}

  }
};

const get_activeListing = async () => {
  let { data: Starhack, error } = await supabase
    .from("marketplace")
    .select("tokenid")
  if (error) {
    console.log(error);
    return { error: error.message };
  }
  if (!Starhack || Starhack.length === 0) {
    return { error: "No data found" };
  }
  const data = Starhack.map(obj=>obj.tokenid)
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
      dataReturn.push(Metadata[0]?.metadata);
    }
  }
  return dataReturn;
};

export async function POST(req: Request, res: Response) {
  const formdata = await req.formData();
  const token_id = Number(formdata.get("token_id"));
  const method = String(formdata.get("method"));
  const seller_address = String(formdata.get("seller_address"))
  const price = Number(formdata.get("price"))

  if (!method) {
    return Response.json({ error: "Invalid request: method is required" });
  }

  if (method === "get") {
    const listing = await get_activeListing();
    console.log(listing)
    if (!listing) {
      return Response.json({ error: "error" });
    }
    return Response.json(listing);
  } else {
    if (!token_id || !seller_address || !price) return Response.json({ error: "No token ID provided" });
    const update = await updateSupabase(token_id, method, seller_address, price);
    if (update?.error) {
      return Response.json({ error: update.error });
    }
    return Response.json(update);
  }
}
