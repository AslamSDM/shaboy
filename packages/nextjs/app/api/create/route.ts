import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";

const get_newData = (current_data: number[], token_id: number, method: string) => {
  let new_data = current_data;
  if (method === "add") {
    new_data.push(token_id);
  } else if (method === "remove") {
    new_data = new_data.filter((item) => item !== token_id);
  }
  return new_data;
};

const updateSupabase = async (token_id: number, method: string) => {
  let { data: Starhack, error } = await supabase
    .from("Starhack")
    .select("active_listings")
    .eq("id", 1);
  if (error) {
    console.log(error);
    return { error };
  }
  if (!Starhack || Starhack.length === 0) {
    return { error: "No data found" };
  }
  const current_data = Starhack[0]?.active_listings;
  const new_data = get_newData(current_data, token_id, method);
  const { data, error: error1 } = await supabase
    .from("Starhack")
    .update({ active_listings: new_data })
    .eq("id", 1);
  if (error1) {
    console.log(error1);
    return { error: error1.message };
  }
  return data;
};

const get_activeListing = async () => {
  let { data: Starhack, error } = await supabase
    .from("Starhack")
    .select("active_listings")
    .eq("id", 1);
  if (error) {
    console.log(error);
    return { error: error.message };
  }
  if (!Starhack || Starhack.length === 0) {
    return { error: "No data found" };
  }

  const data = Starhack[0]?.active_listings;
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
    if (!token_id) return Response.json({ error: "No token ID provided" });
    const update = await updateSupabase(token_id, method);
    if (update?.error) {
      return Response.json({ error: update.error });
    }
    return Response.json(update);
  }
}
