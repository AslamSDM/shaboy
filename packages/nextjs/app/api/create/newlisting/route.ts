import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../utils/supabase";
import { error } from "console";

const get_activeListing = async () => {
  let { data: Starhack, error } = await supabase
    .from("newlisting")
    .select("tokenid");
  if (error) {
    console.log(error);
    return { error: error.message };
  }
  if (!Starhack || Starhack.length === 0) {
    return { error: "No data found" };
  }
  const data = Starhack.map((obj) => obj.tokenid);

  let { data: Metadata, error: error1 } = await supabase
    .from("gamedata")
    .select("*")
    .in("id", data);
  if (error1) {
    console.log(error1);
    return { error: error1.message };
  }
  if (!Metadata || Metadata.length === 0) {
    return { error: "No data found" };
  }
  return Metadata;
};

export async function POST(req: Request, res: Response) {
  const formdata = await req.formData();
  const token_id = Number(formdata.get("token_id"));
  const method = String(formdata.get("method"));
  const seller_address = String(formdata.get("seller_address"));
  const price = Number(formdata.get("price"));

  if (!method) {
    return Response.json({ error: "Invalid request: method is required" });
  }

  if (method === "get") {
    const listing = await get_activeListing();
    console.log(listing);
    if (!listing) {
      return Response.json({ error: "error" });
    }
    return Response.json(listing);
  } else {
    return Response.json({ error: "Error" });
  }
}
