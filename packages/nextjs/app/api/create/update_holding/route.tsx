import { supabase } from "../../../../utils/supabase";
import { RpcProvider, Account ,Contract} from "starknet";
const provider = new RpcProvider({
    nodeUrl:
      "https://rpc.nethermind.io/sepolia-juno?apikey=0Yp6vozXA3H5Codc8VkS22XB1bkBzgV1G4Isr9yJi19ngmpJ",
  });

  const privateKey0 =
  "0x022c19376574847739db37f79db335f807d079368974acc1010698ab70422027";
const account0Address: string =
  "0x00a3eF13C5bEC03E5996fe3ce60D46905B63afadb2686759Cf325B1D01Cc6C62";
const account0 = new Account(provider, account0Address, privateKey0);
const contractAddress =
  "0x0295143c4af58c29088c0cbe87163f0c3f2dd7b1eb0877345f2f59b290aa4228";

const updateMinted=async(addr:string,supply:number)=>{

    const ABIdata =await provider.getClassAt(contractAddress)
    const contract = new Contract(ABIdata.abi,contractAddress,provider)
    contract.connect(account0)
    let token_ID=contract.get_counter_id()-supply
const {data:minted,error}=await supabase.from("owners").select("minted").eq("owner",addr)
if(error){
    return {error:error.message}
}
if(minted){
   const data = minted[0].minted
   for (let i=0;i<supply;i++){
    data.push(token_ID)
    token_ID++
   }
const {error:error2}=await supabase.from("owners").update({minted:data}).eq("owner",addr)
}

}
const updateHoldings=async(addr:string,supply:number)=>{
    const ABIdata =await provider.getClassAt(contractAddress)
    const contract = new Contract(ABIdata.abi,contractAddress,provider)
    contract.connect(account0)
    let token_ID=contract.get_counter_id()-supply
const {data:minted,error}=await supabase.from("owners").select("holdings").eq("owner",addr)
if(error){
    return {error:error.message}
}
if(minted){
   const data = minted[0].holdings
   for (let i=0;i<supply;i++){
    data.push(token_ID)
    token_ID++
   }
const {error:error2}=await supabase.from("owners").update({holdings:data}).eq("owner",addr)
}

}
export async function POST(req: Request) {
    const formdata = await req.formData();
    const supply = Number(formdata.get("supply"));
    const addr = String(formdata.get("addr")) ? String(formdata.get("addr")) : "";
    const method = String(formdata.get("method"));
  
    if (!method) return new Response(JSON.stringify({ error: "Method not provided" }), { status: 400 });
  
    if (method === "minted" && addr && supply) {

        const result = await updateMinted(addr, supply);
    
      return new Response(JSON.stringify(result), { status: 200 });
    }
  
    if (method === 'holdings') {
        const result = await updateHoldings(addr,supply)
      return new Response(JSON.stringify(result), { status: 200 });
    }
  
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }
  