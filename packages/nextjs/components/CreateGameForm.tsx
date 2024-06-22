"use client";
import axios from "axios";
import { useAccount } from "@starknet-react/core"
import { useState } from "react";
import { stringify } from "querystring";
import { flushSync } from "react-dom";
import { createContractCall, useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { Address as AddressType } from "@starknet-react/chains"
import { Address } from "~~/components/scaffold-stark"
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
// import { useAccount } from "@starknet-react/core";


export default function CreateGameForm() {

  const [gameFile, setGameFile] = useState<File | null>(null);
  const [gameImage, setGameImage] = useState<File | null>(null);
  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(Number);
  const [supply, setSupply] = useState(Number);
  const [loading, setLoading] = useState(false)
  const [mintedNFTContractAddress, setContractAddress] = useState("")
  const [NFTminting, setNftminting] = useState(false)
  const [erc20Launch,seterc20Launch]=useState(false) //set this to true if user wants to launch erc20 token
  const [erc20TokenSupply,setErc20TokenSupply]=useState(Number) //set the erc20 token number
  const [erc20TokenName,seterc20TokenName]=useState("")//set the erc20 token name
  const [erc20TokenSymbol,seterc20TokenSymbol]=useState("")//set the erc20 token name
  const connectedAddress = useAccount()
  const formData = new FormData();
    
  const uploadImage = async (game_image_file: File, game_name: String) => {
    try {
      const res = await axios.post("/api/upload/image", {
        game_image_file,
        game_name,
      });
      if (res.data) {
        console.log(res.data);
        return res.data;
      }

    } catch (error) {
      console.log(error);
    }
  }
  const uploadFile = async (game_file: File, game_name: String) => {
    try {
      const res = await axios.post("/api/upload/rom", {
        game_file,
        game_name,
      });
      if (res.data) {
        return res.data;
      }

    } catch (error) {
      console.log(error);
    }
  }

  const {data:shaboyData}=useDeployedContractInfo("ShaboyGames")
  const {data:storageData}=useDeployedContractInfo("ShaboyGamesMinterRegistry")

  const {writeAsync}=useScaffoldMultiWriteContract({
    calls:[
        {
            contractName:"ShaboyGames",
            functionName:"mint_multi",
            args:[gameName,supply]
        },
        {
            contractName:"ShaboyGamesMinterRegistry",
            functionName:"add_minter",
            args:[supply,String(connectedAddress)]
        }
    ]
  })

const launcherc20 = async(supply:Number,name:String,symbol:String,addr:String)=>{
    try {
        const res = await axios.post("/api/create/erc20", {
            supply,
            name,
            symbol,
            addr
        });
        if (res.data) {
          return res.data;
        }
  
      } catch (error) {
        console.log(error);
      }


}

  const handleClick = async (event: React.FormEvent) => {
    setLoading(true)
    event.preventDefault();
    if (gameFile && gameName && gameImage) {

      const imageup: any = await uploadImage(gameImage, gameName);

      // mintNFT
      await writeAsync()
      if(erc20Launch)
        if(erc20TokenSupply &&
            erc20TokenName &&
            erc20TokenSymbol)
        await launcherc20(erc20TokenSupply,erc20TokenName,erc20TokenSymbol,String(connectedAddress))
      // const mintNFTContract = useScaffoldMultiWriteContract("MintNFT")
      // //update supabase
      const fileup: any = await uploadFile(gameFile, gameName);

    }
    setLoading(false)
  }
  return (
    <div className="createGame flex bg-yellow justify-center flex-col md:flex-row mx-[30px] my-[50px] md:my-[100px]">
      {/* UPLOAD FILE */}
      <form onSubmit={handleClick}>
        <div className="file-upload-wrapper">
          <h6 className="title">Upload file</h6>
          <p className="">Drag or choose your file to upload</p>
          <div className="file-upload-inputs">
            <div className="filex-input">
              <label htmlFor="gameImage" className="mb-[0.5rem] block">
                Game NFT Image
              </label>
              <input id="gameImage" type="file" onChange={(e) => { setGameImage(e.target.files?.[0] ?? null) }}></input>
            </div>
            <div className="filex-input">
              <label htmlFor="game" className="mb-[0.5rem] block">
                Game File
              </label>
              <input type="file" onChange={(e) => { setGameFile(e.target.files?.[0] ?? null) }}></input>
            </div>
          </div>
        </div>

            {/* FORM FIELDS */}
            <div className="createGameForm flex flex-col mx-[15px]">
                <div className="input-box">
                    <label htmlFor="name" className="mb-[0.5rem]">Produnction name</label>
                    <input id="name" type="text" placeholder="Digital Awesome game" />
                </div>
                <div className="input-box">
                    <label htmlFor="description" className="mb-[0.5rem]">Discription</label>
                    <textarea id="description" placeholder="Description Here"></textarea>
                </div>
                <div className="input-box">
                    <label htmlFor="price" className="mb-[0.5rem]">Item Price</label>
                    <input id="price" type="text" placeholder="Digital Awesome game" />
                </div>
                <div className="input-box">
                    <label htmlFor="size" className="mb-[0.5rem]">Size</label>
                    <input id="size" type="text" placeholder="Digital Awesome game" />
                </div>

                <button className="submit-button">Submit</button>
            </div>
        </form>
        </div>

    );
}