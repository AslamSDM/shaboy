import { runModel } from "~~/utils/replicate/runmodel"
import { supabase } from "~~/utils/supabase"

function getRandomGame(games:any[]) {
  const randomIndex = Math.floor(Math.random() * games.length);
  return games[randomIndex];
}

export async function POST(req: Request, res: Response) {
  const request = await req.json()

  const { userAddress, emotion } = request

  const games_owned = await supabase.from("ownedgames").select("*").eq("userAddress", userAddress)


  if (!games_owned?.data || games_owned?.data.length === 0) {
    return Response.json({ status: 404, message: "You have no games in your address" })
  }

  const games = games_owned.data
  const gameids = games.map((game) => game.game_id)


  const ownedgames = await supabase.from("gamedata").select("*").in("id", gameids);

  if (!ownedgames?.data || ownedgames?.data.length === 0) {
    return Response.json({ status: 404, message: "No games found" })
  }

  const ownedgamesdata = ownedgames.data.map((game) => {
    const metadata = game.metadata
    return {
      id: metadata.id,
      name: metadata.name,
      description: metadata.description,
    }
  })

  console.log(ownedgames.data)

  const jsonout = await runModel(ownedgamesdata, emotion)
  if (!jsonout) {
    // return Response.json({ status: 500, message: "Error running model" })
    const _g = getRandomGame(ownedgames.data)
    return Response.json({ status: 200, message: "AI Model Call Failed", selectedgame: _g})
  }
  // console.log("Suggestion =====> ",jsonout)

  const selectedgame = ownedgames.data.find((game) => game.name === jsonout.game);


  if (!selectedgame) {
    if(ownedgames.data.length > 0){
      // Suggestion Failed, take random one
      const _g = getRandomGame(ownedgames.data);
      return Response.json({ status: 200, message: "AI Suggestion Failed", selectedgame: _g})
    }
    return Response.json({ status: 404, message: "No game found" })
  }
  return Response.json({ status: 200, selectedgame: selectedgame, message: "AI suggesion succesful" })
}
