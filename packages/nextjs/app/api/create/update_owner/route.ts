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

const getSupabase = async (addr: string,tab="1") => {
  if(tab == "1"){
  const { data: Starhack, error } = await supabase
    .from("ownedgames").select("*").eq("userAddress", addr);

  if (Starhack) {
    const ownedgameid = Starhack.map((game:any) => game.game_id);
    const ownedgames = await supabase.from("gamedata").select("*").in("id", ownedgameid);
    return ownedgames.data;
  } else {
    return { error: error.message };
  }
}else if(tab == "2"){
  const { data: Starhack, error } = await supabase
    .from("newlisting").select("*").eq("seller", addr);

  if (Starhack) {
    const ownedgameid = Starhack.map((game:any) => game.tokenid);
    const ownedgames = await supabase.from("gamedata").select("*").in("id", ownedgameid);
    return ownedgames.data;
  } else {
    return { error: error.message };
  }
} else if(tab == "3"){
  const { data: Starhack, error } = await supabase
    .from("owners").select("*").eq("owner", addr);

  if (Starhack) {
    const ownedgameid = Starhack[0]?.mintings;
    const ownedgames = await supabase.from("gamedata").select("*").in("id", ownedgameid);

    return ownedgames.data;
  } else {
    return { error: error.message };
  }
}
}

export async function POST(req: Request) {
  const formdata = await req.formData();
  const buyer_addr = String(formdata.get("buyer_addr"));
  const seller_addr = String(formdata.get("seller_addr"));
  const token_id = Number(formdata.get("token_id"));
  const addr = String(formdata.get("addr")) ? String(formdata.get("addr")) : "";
  const method = String(formdata.get("method"));
  const tab = Number(formdata.get("tab"));
  console.log(buyer_addr, seller_addr, token_id, addr, method);
  if (!method) return new Response(JSON.stringify({ error: "Method not provided" }), { status: 400 });

  if (method === "update" && buyer_addr && seller_addr && token_id) {
    const result = await updateSupabase(buyer_addr, seller_addr, token_id);
    return new Response(JSON.stringify(result), { status: 200 });
  }

  if (method === 'get') {
    const result = await getSupabase(addr,tab);
    return new Response(JSON.stringify(result), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
}
