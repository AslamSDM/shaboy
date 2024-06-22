import { supabase } from "~~/utils/supabase";


export async function GET(req:Request){
    const url = new URL(req.url);
    const gameid = url.searchParams.get("gameid");
    const game = await supabase
      .from("gamedata")
      .select("*")
      .eq("id", gameid);
    if (game.error) {
        return Response.json({ error: game.error });
        }
    if (game.data.length === 0) {
        return Response.json({ error: "Game not found" });
        }
    return Response.json(game.data[0].metadata);
}