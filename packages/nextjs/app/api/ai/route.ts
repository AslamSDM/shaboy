import { runModel } from "~~/utils/replicate/runmodel"
import { supabase } from "~~/utils/supabase"


export async function POST(req: Request, res: Response) {
  const request = await req.json()

  const { userAddress, emotion } = request
  const games_owned = await supabase.from("ownedgames").select("*").eq("userAddress", userAddress)
  
  if (!games_owned?.data || games_owned?.data.length === 0) {
   
    return Response.json({ message: "User has no games", status: 400 })
    
  }
  const games = games_owned.data
  const gameids = games.map((game) => game.game_id)

  const ownedgames = await supabase.from("gamedata").select("*").in("id", gameids)
  if (!ownedgames?.data || ownedgames?.data.length === 0) {
    return Response.json({ message: "No games found", status: 400 })
    
  }
  const ownedgamesdata = ownedgames.data.map((game) => { 
    const metadata = game.metadata
    return {
      id: metadata.id,
      name: metadata.name,
      description: metadata.description,
    }
   })
  const jsonout = await runModel(ownedgamesdata, emotion)
  if (!jsonout) {
    return Response.json({ message: "Error running model", status: 400 })
  }
  const selectedgame = ownedgamesdata.find((game) => game.name === jsonout.game)
  if (!selectedgame) {
    return Response.json({ message: "No game found", status: 400 })
  }
  return Response.json({ selectedgame: selectedgame, status: 200})


}
