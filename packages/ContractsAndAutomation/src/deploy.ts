// declare & deploy a contract.
// use of OZ deployer
// launch with npx ts-node src/scripts/5.declareDeployContractOZ.ts
// Coded with Starknet.js v5.16.0, Starknet-devnet-rs v0.1.0

import { Account, CallData, Contract, json, Provider,constants } from "starknet";
import fs from "fs";
// dotenv.config();


//          👇👇👇
// 🚨🚨🚨 launch 'cargo run --release -- --seed 0' in devnet-rs directory before using this script
//          👆👆👆
async function main() {
    // const provider = new RpcProvider({ nodeUrl: "https://rpc.nethermind.io/sepolia-juno" }); // only for starknet-devnet-rs
    const provider =new Provider({sequencer:{ network: constants.NetworkName.SN_SEPOLIA }} );
    // initialize existing predeployed account 0 of Devnet
    const OZ_ACCOUNT0_DEVNET_PRIVATE_KEY="0x022c19376574847739db37f79db335f807d079368974acc1010698ab70422027"
    const OZ_ACCOUNT0_DEVNET_ADDRESS = "0x00a3eF13C5bEC03E5996fe3ce60D46905B63afadb2686759Cf325B1D01Cc6C62"
    const privateKey0 = OZ_ACCOUNT0_DEVNET_PRIVATE_KEY ?? "";
    const accountAddress0: string = OZ_ACCOUNT0_DEVNET_ADDRESS ?? "";
    const account0 = new Account(provider, accountAddress0, privateKey0);
    console.log("Account 0 connected.\n");

    // Declare & deploy Test contract in devnet
    const testCasm = json.parse(fs.readFileSync("./../target/dev/starknet_testing_ShaboyGames.compiled_contract_class.json").toString("ascii"));
    const testSierra =json.parse(fs.readFileSync("./../target/dev/starknet_testing_ShaboyGames.contract_class.json").toString("ascii"));
    const myCallData = new CallData(testSierra.abi);
    // console.log(myCallData)
    const constructor = myCallData.compile('constructor', { name: "TESTING",symbol:"TST",base_uri:"xxxx.com",recipient:"0x00a3eF13C5bEC03E5996fe3ce60D46905B63afadb2686759Cf325B1D01Cc6C62",num:0x5 });
    console.log(constructor)
    const deployResponse = await account0.declareAndDeploy({
        contract: testSierra,
        casm: testCasm,
        constructorCalldata: constructor,
        salt: "123456"
    });
    // In case of constructor, add for example : ,constructorCalldata: [encodeShortString('Token'),encodeShortString('ERC20'),account.address,],

    // Connect the new contract instance :
    const myTestContract = new Contract(testSierra.abi, deployResponse.deploy.contract_address, provider);
    console.log('✅ Test Contract connected at =', myTestContract.address);

}
main()
    .then(() => {console.log("done")})
    .catch((error) => {
        console.error(error);
    });