import { supabase } from "~~/utils/supabase";
import axios from "axios";

const cdnurl = process.env.BUNNYCDN_HOSTNAME as string;
const ACCESS_KEY = process.env.BUNNYCDN_API_KEY as string;

// export async function GET(req: Request) {
//   // reurns owned games
//   const url = new URL(req.url);
//   const userAddress = url.searchParams.get("address");
//   const game = await supabase
//     .from("ownedgames")
//     .select("*")
//     .eq("userAddress", userAddress);
//   if (game.error) {
//     return Response.json({ error: game.error });
//   }
//   if (game.data.length === 0) {
//     return Response.json({ error: "Game not found" });
//   }
//   return Response.json(game.data);
// }

export async function POST(req: Request) {
  const requst = await req.json();
  const userAddress = requst.userAddress;
  const gameId = requst.gameId;
  console.log("userAddress", userAddress, "gameId", gameId)
  if(!userAddress || !gameId){
    return Response.json({ error: "Invalid request" });
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
    !ownedgames.data.some((game) => game.game_id == gameId)
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
  const url = `https://storage.bunnycdn.com/shaboygames/roms/${metadata.name}.gba`;
  console.log(ACCESS_KEY);
  const rom = await axios.get(url, {
    responseType: "arraybuffer",
    headers: {
      AccessKey: ACCESS_KEY,
      accept: '*/*'
    },
  });

  console.log(rom);
  const gamebuff= new Uint8Array(rom.data);

  console.log(gamebuff);
  const base64GameBuff = bufferToBase64(gamebuff);
  
  // Assuming Response.json is the way to send data
  return Response.json({ data: base64GameBuff, contentType: 'application/json' });
  // const cleanName = metadata.name.replace(/ /g, "%20"); 
  // return Response.json({ url: `${cdnurl}/roms/${cleanName}.gba`});
}

export async function GET(req: Request) {

  const link = new URL(req.url);
  const gameId = link.searchParams.get("gameId");
  // const ownedgames = await supabase
  //   .from("ownedgames")
  //   .select("*")
  //   .eq("userAddress", userAddress);
  // if (ownedgames.error) {
  //   return Response.json({ error: ownedgames.error });
  // }

  // if (
  //   ownedgames.data.length === 0 ||
  //   !ownedgames.data.some((game) => game.game_id == gameId)
  // ) {
  //   return Response.json({ error: "You dont own the game" });
  // }
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
  const name = metadata.name;
    const url = `https://storage.bunnycdn.com/shaboygames/roms/${name}.gba`;
  const rom = await axios.get(url, {
    responseType: "arraybuffer",
    headers: {
      AccessKey: ACCESS_KEY,
      accept: '*/*'
    },
  });
  
  const gamebuff= rom.data
  const buff = new Uint8Array(gamebuff);

  const base64GameBuff = bufferToBase64(gamebuff);
  
  return Response.json({ data: base64GameBuff});
}
function bufferToBase64(buf: Uint8Array) {
  var binary = '';
  var bytes = new Uint8Array(buf);
  console.log(bytes);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Buffer.from(binary, 'binary').toString('base64');
}
