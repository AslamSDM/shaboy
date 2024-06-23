import { supabase } from "../../../utils/supabase";

export async function POST(re: Request) {
    console.log("request received");
    const formdata = await re.formData();
    const token_id = Number(formdata.get("token_id"));
    console.log(token_id);

    const gameid = await supabase.from("marketplace")
        .select("seller")
        .eq("tokenid", token_id);

    if (gameid.error || gameid.data.length === 0) {
        return Response.json({ error: gameid.error });
    }

    return Response.json({
        price: gameid.data[0].seller
    });
}