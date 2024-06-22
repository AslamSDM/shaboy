import { supabase } from "../../../utils/supabase";


export async function GET(re:Request){
    const gameid = (await supabase.from("gamedata")
    .select("id")
    .order("id", { ascending: false })
    .limit(1))
    if(gameid.error){
        return Response.json({error:gameid.error})
    }
    return Response.json({
        gameid:gameid.data[0].id + 2
    })
}