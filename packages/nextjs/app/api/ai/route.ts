import { supabase } from "~~/utils/supabase"


export async function POST(req: Request, res: Response) {
  const request = await req.json()

  const { userAddress, emotion } = request
  const games_owned = await supabase.from("ownedgames").select("*").eq("userAddress", userAddress)
  if (!games_owned?.data || games_owned?.data.length === 0) {
    Response.json({ message: "User has no games", status: 400 })
    return
  }


}
