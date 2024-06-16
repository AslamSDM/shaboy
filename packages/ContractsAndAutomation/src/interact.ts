// interact.ts

import fs from 'fs';
import { json, RpcProvider, shortString, Contract, Account, ec } from 'starknet';
const privateKey0 = "0x06809b537f1d3726e5eb590a98770408cf19a5ea0f6906f15de21ebd73809d0e"
const account_address = "0x040ED537B1722575873B448b8Cf9d630CA4EdaC52b7478e38CaAD0B5d860B5ef"
const provider = new RpcProvider({ nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7" });
const account0 = new Account(provider, account_address, privateKey0)
const addrContract = "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"
const compiledContract = json.parse(fs.readFileSync('./udcabi.json').toString('ascii')) // comment this line to create abi of the udc
// console.log(provider)
const getABI = async () => {
   console.log(await provider.getChainId())
   console.log("chain Id =", shortString.decodeShortString(await provider.getChainId()), ", rpc", await provider.getSpecVersion());
   const compressedContract = await provider.getClassAt(addrContract);
   console.log(compressedContract)
   fs.writeFileSync('./udcabi.json', json.stringify(compressedContract.abi, undefined, 2));
}


const interact = async () => {
   // const { abi } = await provider.getClassAt(addrContract);
   // const udcContract = new Contract(abi, addrContract, provider)
   // udcContract.connect(account0)
   // const calldata = udcContract.populate('deployContract', ['0x01a6b7a2692f24ab772f330315bb56a485daba8a72c27fe996d275178f19c1e8', '0x1234566', '0x00', ["0x0186a0", "0x09ac223f271726c9", "0x040ED537B1722575873B448b8Cf9d630CA4EdaC52b7478e38CaAD0B5d860B5ef", "0x74657473696e67707572706f7365", "0x545354"]])
   // const res = await udcContract.deployContract(calldata.calldata)
   // console.log(res.transaction_hash)
   // const reciept = await provider.waitForTransaction(res.transaction_hash)
   // console.log(reciept.match())
   // console.log("done")
   const reciept = await account0.deployContract({ classHash: "0x01a6b7a2692f24ab772f330315bb56a485daba8a72c27fe996d275178f19c1e8", constructorCalldata: ["0x0186a0", "0x09ac223f271726c9", "0x040ED537B1722575873B448b8Cf9d630CA4EdaC52b7478e38CaAD0B5d860B5ef", "0x74657473696e67707572706f7365", "0x1000000"] })
   console.log(reciept.transaction_hash)
   await provider.waitForTransaction(reciept.transaction_hash);
   const { abi: testAbi } = await provider.getClassByHash("0x01a6b7a2692f24ab772f330315bb56a485daba8a72c27fe996d275178f19c1e8");
   const myTestContract = new Contract(testAbi, reciept.contract_address, provider);
   console.log('✅ Test Contract connected at =', myTestContract.address);
}
interact()

//if no UDC run getABI() after commenting the line 7
// 0x0186a0 constructor identifier in hex