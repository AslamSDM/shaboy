import { supabase } from "~~/utils/supabase"


export async function POST(req: Request, res: Response) {
  const request = await req.json()

  const { id } = request;

  const game = await supabase.from("gamedata").select("*").in("id", [id]);
  // console.log(game)
  if (!game?.data || game?.data.length === 0) {
    return Response.json({ status: 404, message: "Fetch failed" })
  }
  return Response.json({ status: 200, game: game.data, message: "Fetch Success" })
}
