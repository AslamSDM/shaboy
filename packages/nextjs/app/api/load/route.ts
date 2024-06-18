import { supabase } from "~~/utils/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const contract_address = url.searchParams.get("address")
    const game = await supabase.from("gamedata").select("*").eq("contract_address",contract_address)

}