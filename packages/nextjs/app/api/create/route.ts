import axios from "axios";
import { supabase } from "../../../utils/supabase";
import { error } from "console";
import { u } from "@starknet-react/core/dist/index-79NvzQC9";

const get_newData = (
  current_data: number[],
  token_id: number,
  method: string
) => {
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
  console.log(typeof new_data);
  const { data, error: error1 } = await supabase
    .from("Starhack")
    .update([{ active_listings: new_data }])
    .eq("id", 1);
  if (error1) {
    console.log(error);
    return { error };
  }
  return data;
};

const get_activeListing = async () => {
  let { data: Starhack, error } = await supabase
    .from("Starhack")
    .select("active_listings")
    .eq("id", 1);
  if (!Starhack || Starhack.length === 0) {
    return { error: "No data found" };
  }
  if (error) {
    console.log(error);
    return { error };
  }
  return Starhack[0]?.active_listings;
};

export async function POST(req: Request) {
  const formdata = await req.formData();
  const token_id = Number(formdata.get("token_id"));
  const method = String(formdata.get("method"));
  if (!method || !token_id) {
    return Response.json({ error: "Invalid request" });
  }
  if (method == "get") {
    const listing = await get_activeListing();
    if (listing.error) {
      return Response.json(listing.error);
    }
    return Response.json(listing);
  } else {
    const update = await updateSupabase(token_id, method);
    if(!update){
      return Response.json({ error: "No data found" });
    }
    if (update.error ) {
      return Response.json(update.error);
    }
    const res = update;
    return Response.json(res);
  }
}
