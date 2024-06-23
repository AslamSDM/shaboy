import { supabase } from "../../../utils/supabase";

import { RpcProvider, Account, Contract } from "starknet";
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


function toHex(input: number | string): string {
  if (typeof input === "number") {
    return "0x" + input.toString(16);
  } else if (typeof input === "string") {
    return "0x" + Array.from(input)
      .map((char) => char.charCodeAt(0).toString(16))
      .join('');
  } else {
    throw new TypeError("Input must be a number or a string");
  }
}


export async function POST(req: Request) {
  const formdata = await req.formData();
  const token_id = Number(formdata.get("token_id"));
  const addr = String(formdata.get("addr")) ? String(formdata.get("addr")) : "";


  if (addr && token_id) {

    const ABIdata = await provider.getClassAt(contractAddress)
    const contract = new Contract(ABIdata.abi, contractAddress, provider)
    contract.connect(account0)
    const owner = await contract.owner_of(toHex(token_id))
    console.log(owner)
    return new Response(JSON.stringify((owner == addr)), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
}

