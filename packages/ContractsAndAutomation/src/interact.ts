// interact.ts
import { randomBytes } from 'crypto';
import fs from 'fs';
import { json, RpcProvider,shortString,Contract,Account,ec} from 'starknet';
import {Parsor_func} from './Supabase_Data_Insert';
import {Updater_json} from './Updated_Json';

import * as JSON5 from 'json5';



const privateKey0="0x066ce4f5cfcb0e438c7a166ccf75b0de9afd0dea3547b5ae9832747d3f299370"
const account_address="0x04Dcd37623ebf6711CD0A694Fd905296586F9cD89e52aefFdeFE23612CdbB804"
const provider = new RpcProvider({ nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7"});
const account0=new Account(provider,account_address,privateKey0)
const addrContract="0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"

const storage_addr="0x04b61e88d5e02db83943a3c2b9937ddd9cc7710293841509e3d4f75aca1a6d14"
const storage_class_hash = "0x0199e1755d8af67280233142728f313691feee578e7814220e8cc62c327278b4"

const compiledContract=json.parse(fs.readFileSync('./udcabi.json').toString('ascii')) // comment this line to create abi of the udc
// console.log(provider)
const getABI=async()=>{
    console.log(await provider.getChainId())
    console.log("chain Id =", shortString.decodeShortString(await provider.getChainId()), ", rpc", await provider.getSpecVersion());
    const compressedContract = await provider.getClassAt(addrContract);
    console.log(compressedContract)
fs.writeFileSync('./udcabi.json', json.stringify(compressedContract.abi, undefined, 2));
 }





let z=0


const update_storage = async(owner_address:any,deployed_address:any)=>{
  const {abi} = await provider.getClassAt(storage_addr);
  // console.log(abi)
  const myTestContract = new Contract(abi, storage_addr, provider);
  // console.log({myTestContract})
  myTestContract.connect(account0);


  const myCall = myTestContract.populate('seterc721', [owner_address,deployed_address]);
  const res = await myTestContract.seterc721(myCall.calldata);
  await provider.waitForTransaction(res.transaction_hash);
  
}


const interact =async()=>{

fs.readFile('nft_hash_data_complete.json', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    // Parse the JSON data
    const jsonData = JSON5.parse(data);
    let j=0  
    // Iterate over the game data and insert into Supabase
    for (let i = 0; i < jsonData.gameData.length; i++) {  

  const addresses: string[] = [
    '0x04Dcd37623ebf6711CD0A694Fd905296586F9cD89e52aefFdeFE23612CdbB804',
    '0x03a696e70098885CAEB333458a0D77CDadc0e6CE5e3581617544FaA7Fb8BeBdd',
    '0x01C97b772c6fFf0EEC3fD197D21E926A999e77C8cC8D1cfBE216a4D39aEF199d',
    '0x00a3eF13C5bEC03E5996fe3ce60D46905B63afadb2686759Cf325B1D01Cc6C62'
  ];
 
  // function to random seleccct one of the addresses given above
  const getRandomAddress = (): string => {
    const randomIndex = randomBytes(1).readUInt8(0) % addresses.length;
    console.log('Adress Selected:',addresses[randomIndex])
    return addresses[randomIndex];
  };
 
 //  //function to create a random 6 digit hex value to pass into 'populate'
 //  const getRandomHexValue = (): string => {
 //    const random_Bytes = randomBytes(3);
 //    const hexValue = random_Bytes.toString('hex').toUpperCase();
 //    console.log('Random Hex Value:', '0x' + hexValue);
 //    return `0x${hexValue}`;
 //  };
 
 
 const jsonData = JSON.parse(fs.readFileSync('./nft_hash_data_complete.json').toString('utf-8')); 
 const gamedata = jsonData.gameData[z];
 const name     =      gamedata.name;
 const supply   =      gamedata.supply;
 const hash     =      gamedata.hash; 
 
 
 console.log("Name:", name);
 console.log("Supply:", supply);
 console.log("Hash:", hash);
 
 
 // Get the first 30 characters of the 'name' parameter
 const truncated_name = name.substring(0, 30);
 console.log(truncated_name)
 // Get the first 30 characters of the 'hash' parameter
 const truncated_hash = hash.substring(0, 30);
 console.log(truncated_hash)
 
 // Convert the 'name' parameter to a hexadecimal value
 const hexValue_name   = Buffer.from(truncated_name).toString('hex'); 
 const real_name='0x' + hexValue_name
 console.log(real_name)
 
 // Convert the 'supply' parameter to a hexadecimal value
 const hexValue_supply = supply.toString(16);
 const real_supply = '0x' + hexValue_supply;
 console.log(real_supply);
 
 // Convert the 'hash' parameter to a hexadecimal value
 const hexValue_hash   = Buffer.from(truncated_hash).toString('hex'); 
 const real_hash='0x' + hexValue_hash
 console.log(real_hash)
 
 
 
 const abbreviateTitle=(title: string): string =>{
    const words = title.split(' ');
    let abbreviation = ''; 
    if (words.length === 1) {
      // Single word title, take first 3 characters
      abbreviation = title.substring(0, 3).toUpperCase();
    } else {
      // Multi-word title, take first character of each word
      for (const word of words) {
        abbreviation += word.charAt(0).toUpperCase();
      }
      // If abbreviation is too long, truncate to 4 characters
      abbreviation = abbreviation.substring(0, 4).toUpperCase();
    }
    console.log(abbreviation)
    return abbreviation;
  }
 
 const symbol = abbreviateTitle(name)
 
 // Convert the 'symbol' parameter to a hexadecimal value
 const hexValue_symbol   = Buffer.from(symbol).toString('hex'); 
 const real_symbol= '0x' + hexValue_symbol
 console.log(real_symbol)

console.log("Processing index",z)

  const current_address=getRandomAddress()
  const reciept = await account0.deployContract({classHash:"0x05847fa19fd8c469403297601d21d3d471689412b5df5a3f20b82a0d2f7d1404",constructorCalldata:[real_name, real_symbol, real_hash, current_address,real_supply,"0x00"]})
  console.log("transaction_Hash:",reciept.transaction_hash)
  await provider.waitForTransaction(reciept.transaction_hash) 
  console.log("contract_adress:",reciept.contract_address)
  //await provider.waitForTransaction(reciept.contract_address)
  console.log("done")


   Updater_json(z,reciept.transaction_hash,reciept.contract_address)

   await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay 
   await update_storage(current_address,reciept.contract_address)
   
   
   
   z++;
 }
}
)

};

 interact()

