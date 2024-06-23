import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../utils/supabase";
import { error } from "console";

const get_activeListing = async () => {
  let { data: Starhack, error } = await supabase
    .from("newlisting")
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
        return Response.json({error:"Error"})
  }
}
