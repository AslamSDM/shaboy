import { supabase } from "~~/utils/supabase";
import axios from "axios";

const cdnurl = process.env.BUNNYCDN_HOSTNAME as string;
const ACCESS_KEY = process.env.BUNNYCDN_API_KEY as string;

export async function GET(req: Request) {
  // reurns owned games
  const url = new URL(req.url);
  const userAddress = url.searchParams.get("address");
  const game = await supabase
    .from("ownedgames")
    .select("*")
    .eq("userAddress", userAddress);
  if (game.error) {
    return Response.json({ error: game.error });
  }
  if (game.data.length === 0) {
    return Response.json({ error: "Game not found" });
  }
  return Response.json(game.data);
}

export async function POST(req: Request) {
  const requst = await req.json();
  const userAddress = requst.userAddress;
  const gameId = requst.gameId;

  if (!(userAddress instanceof String)) {
    return Response.json({ error: "Invalid input" });
  }
  const ownedgames = await supabase
    .from("ownedgames")
    .select("*")
    .eq("userAddress", userAddress);
  if (ownedgames.error) {
    return Response.json({ error: ownedgames.error });
  }
  if (
    ownedgames.data.length === 0 ||
    !ownedgames.data.some((game) => game.gameId == gameId)
  ) {
    return Response.json({ error: "You dont own the game" });
  }
  // todo : check if the game is owned in sc

  const gameDatas = await supabase
    .from("gamedata")
    .select("*")
    .eq("id", gameId);
  if (gameDatas.error) {
    return Response.json({ error: gameDatas.error });
  }
  if (gameDatas.data.length === 0) {
    return Response.json({ error: "Game not found" });
  }
  const gameData = gameDatas.data[0];
  const metadata = gameData.metadata;

  const rom = await axios.get(`https://${cdnurl}/roms/${metadata.name}.gba`, {
    responseType: "arraybuffer",
    headers: {
      AccessKey: ACCESS_KEY,
    },
  });

  return new Response(rom.data, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
}
