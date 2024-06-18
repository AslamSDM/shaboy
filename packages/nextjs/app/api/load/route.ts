import { supabase } from "~~/utils/supabase";
import axios from "axios";
const cdnurl = process.env.BUNNYCDN_HOSTNAME as string;
const ACCESS_KEY = process.env.BUNNYCDN_API_KEY as string;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const contract_address = url.searchParams.get("address");
  const game = await supabase
    .from("gamedata")
    .select("*")
    .eq("contract_address", contract_address);
  if (game.error) {
    return Response.json({ error: game.error });
  }
  if (game.data.length === 0) {
    return Response.json({ error: "Game not found" });
  }
  const metadata = game.data[0].metadata;
  return Response.json(metadata);
}

export async function POST(req: Request) {
  const formdata = await req.formData();
  const contract_address = formdata.get("contract_address");
  const metadata = formdata.get("metadata");
  if (!(contract_address instanceof String) || !(metadata instanceof String)) {
    return Response.json({ error: "Invalid input" });
  }
  const game = await supabase
    .from("gamedata")
    .select("*")
    .eq("contract_address", contract_address);
  if (game.error) {
    return Response.json({ error: game.error });
  }
  if (game.data.length === 0) {
    return Response.json({ error: "Game not found" });
  }
  const rom = await axios.get(
    `https://${cdnurl}/roms/${game.data[0].contract_address}.gba`,
    {
      responseType: "arraybuffer",
      headers: {
        AccessKey: ACCESS_KEY,
      },
    }
  );

  return new Response(rom.data, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
}
