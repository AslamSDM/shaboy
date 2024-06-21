import { RpcProvider, Account } from "starknet";

const provider = new RpcProvider({
  nodeUrl:
    "https://rpc.nethermind.io/sepolia-juno?apikey=0Yp6vozXA3H5Codc8VkS22XB1bkBzgV1G4Isr9yJi19ngmpJ",
});
const privateKey0 =
  "0x022c19376574847739db37f79db335f807d079368974acc1010698ab70422027";
const account0Address: string =
  "0x00a3eF13C5bEC03E5996fe3ce60D46905B63afadb2686759Cf325B1D01Cc6C62";
const account0 = new Account(provider, account0Address, privateKey0);
const erc20TokenAddress =
  "0x01a6b7a2692f24ab772f330315bb56a485daba8a72c27fe996d275178f19c1e8";

function toHex(input: number | string): string {
  if (typeof input === "number") {
    return input.toString(16);
  } else if (typeof input === "string") {
    return Array.from(input)
      .map((char) => char.charCodeAt(0).toString(16))
      .join(" ");
  } else {
    throw new TypeError("Input must be a number or a string");
  }
}

const launchToken = async (
  token_supply: number,
  token_name: string,
  symbol: string,
  addr: string
) => {
  const reciept = await account0.deployContract({
    classHash: erc20TokenAddress,
    constructorCalldata: [
      0x0186a0,
      toHex(token_supply),
      toHex(addr),
      toHex(token_name),
      toHex(symbol),
    ],
  });
  provider.waitForTransaction(reciept.transaction_hash);

  return reciept.contract_address;
};

export async function POST(req: Request) {
  const formdata = await req.formData();
  const token_supply = Number(formdata.get("supply"));
  const token_name = String(formdata.get("name"));
  const symbol = String(formdata.get("symbol"));
  const addr = String(formdata.get("addr"));

  const res = await launchToken(token_supply, token_name, symbol, addr);
  return Response.json(res);
}
