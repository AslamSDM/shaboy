"use client";
import axios from "axios";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import { stringify } from "querystring";
import { flushSync } from "react-dom";
import {
  createContractCall,
  useScaffoldMultiWriteContract,
} from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { Address as AddressType } from "@starknet-react/chains";
import { Address } from "~~/components/scaffold-stark";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
// import { useAccount } from "@starknet-react/core";

export default function CreateGameForm() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [gameFile, setGameFile] = useState<File | null>(null);
  const [gameImage, setGameImage] = useState<File | null>(null);
  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState(Number);
  const [loading, setLoading] = useState(false);
  const [mintedNFTContractAddress, setContractAddress] = useState("");
  const [NFTminting, setNftminting] = useState(false);
  const [erc20Launch, seterc20Launch] = useState(false); //set this to true if user wants to launch erc20 token
  const [erc20TokenSupply, setErc20TokenSupply] = useState(Number); //set the erc20 token number
  const [erc20TokenName, seterc20TokenName] = useState(""); //set the erc20 token name
  const [erc20TokenSymbol, seterc20TokenSymbol] = useState(""); //set the erc20 token name
  const [imageUrl, setImageurl] = useState("");
  const { address: addr } = useAccount();
  const formData = new FormData();

  const uploadImage = async (game_image_file: File, game_name: String) => {
    try {
      const res = await axios.post("/api/upload/image", {
        game_image_file,
        game_name,
      });
      if (res.data) {
        console.log(res.data);
        setImageurl(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadFile = async (game_file: File, game_name: string) => {
    try {

      const gameid= await axios.get("/api/getgameid")
      formData.append("gameId",(gameid.data))
      formData.append("name", game_name);
      formData.append("image", imageUrl);
      formData.append("file", game_file);
      formData.append("description",description)
      formData.append("supply",String(supply))

      const res = await axios.post("/api/upload/rom",
        formData,
      );
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: shaboyData } = useDeployedContractInfo("ShaboyGames");
  const { data: storageData } = useDeployedContractInfo(
    "ShaboyGamesMinterRegistry"
  );

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

  const { writeAsync } = useScaffoldMultiWriteContract({
    calls: [
      createContractCall("ShaboyGames","mint_multi",[toHex(gameName),(supply)]),
      createContractCall("ShaboyGamesMinterRegistry","add_minter",[(supply),(addr)])
    ],
  });

  const launcherc20 = async (
    supply: Number,
    name: String,
    symbol: String,
    addr: String
  ) => {
    try {
      formData.append("supply",String(supply))
      formData.append("name",String(name))
      formData.append("symbol",String(symbol))
      formData.append("addr",String(addr))
      const res = await axios.post("/api/create/erc20",formData);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    if (gameFile && gameName && gameImage &&supply) {
      const imageup: any = await uploadImage(gameImage, gameName);

      // mintNFT
      await writeAsync();

      if (erc20Launch)
        if (erc20TokenSupply && erc20TokenName && erc20TokenSymbol)
          await launcherc20(
            erc20TokenSupply,
            erc20TokenName,
            erc20TokenSymbol,
            String(addr)
          );
      // const mintNFTContract = useScaffoldMultiWriteContract("MintNFT")
      // //update supabase
      const fileup: any = await uploadFile(gameFile, gameName);
      formData.append("method","minted")
      formData.append("supply",String(supply))
      formData.append("addr",String(addr))
      await axios.post("api/create/update_owner",formData);
      formData.set("method","holdings")
      await axios.post("api/create/update_owner", formData);
    }
    setLoading(false);
  };
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
              <input
                id="gameImage"
                type="file"
                onChange={(e) => {
                  setGameImage(e.target.files?.[0] ?? null);
                }}
              ></input>
            </div>
            <div className="filex-input">
              <label htmlFor="game" className="mb-[0.5rem] block">
                Game File
              </label>
              <input
                type="file"
                onChange={(e) => {
                  setGameFile(e.target.files?.[0] ?? null);
                }}
              ></input>
            </div>
          </div>
        </div>

        {/* FORM FIELDS */}
        <div className="createGameForm flex flex-col mx-[15px]">
          <div className="input-box">
            <label htmlFor="name" className="mb-[0.5rem]">
              Game name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digital Awesome game"
              onChange={(value) => {
                setGameName(value.target.value);
              }}
            />
          </div>
          <div className="input-box">
            <label htmlFor="description" className="mb-[0.5rem]">
              Discription
            </label>
            <textarea
              id="description"
              placeholder="Description Here"
              onChange={(value) => {
                setDescription(value.target.value);
              }}
            ></textarea>
          </div>

          <div className="input-box">
            <label htmlFor="price" className="mb-[0.5rem]">
              Item Supply
            </label>
            <input
              id="price"
              type="text"
              placeholder="Digital Awesome game"
              onChange={(value) => {
                setSupply(Number(value.target.value));
              }}
            />
          </div>
          <div className="input-box flex items-center">
            <input
              id="token"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="token" className="ml-[10px]">
              Do you want to deploy token ?
            </label>
          </div>
          <div
            className={`input-box ${isChecked ? "flex flex-col" : "hidden"}`}
          >
            <label htmlFor="token-name" className="mb-[0.5rem]">
              Token Name
            </label>
            <input
              id="token-name"
              type="text"
              placeholder="Tether"
              onChange={(value) => {
                seterc20TokenName(value.target.value);
              }}
            />
          </div>
          <div
            className={`input-box ${isChecked ? "flex flex-col" : "hidden"}`}
          >
            <label htmlFor="token-symbol" className="mb-[0.5rem]">
              Token Symbol
            </label>
            <input
              id="token-symbol"
              type="text"
              placeholder="USDT"
              onChange={(value) => {
                seterc20TokenSymbol(value.target.value);
              }}
            />
          </div>
          <div
            className={`input-box ${isChecked ? "flex flex-col" : "hidden"}`}
          >
            <label htmlFor="total-supply" className="mb-[0.5rem]">
              Token Supply
            </label>
            <input
              id="total-supply"
              type="text"
              placeholder="1000000"
              onChange={(value) => {
                setErc20TokenSupply(Number(value.target.value));
              }}
            />
          </div>

          <button className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
}
