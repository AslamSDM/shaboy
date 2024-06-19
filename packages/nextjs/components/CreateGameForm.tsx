"use client";
// Use the api keys by providing the strings directly
import fs from "fs";
import axios from "axios";
import { useAccount } from "@starknet-react/core"
import { useState } from "react";
import { stringify } from "querystring";
import { flushSync } from "react-dom";
import { createContractCall, useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { Address as AddressType } from "@starknet-react/chains"
import { Address } from "~~/components/scaffold-stark"
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
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
  const handleClick = async (event: React.FormEvent) => {
    setLoading(true)
    event.preventDefault();
    if (gameFile && gameName && gameImage) {

      const imageup: any = await uploadImage(gameImage, gameName);

      // mintNFT
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

        {/* FmRM FIELDS */}
        <div className="createGameForm flex flex-col mx-[15px]">
          <div className="input-box">
            <label htmlFor="name" className="mb-[0.5rem]">
              Production name
            </label>
            <input id="name" type="text" placeholder="Digital Awesome game" onChange={(e) => { formData.append("gameName", e.target.value) }} />
          </div>
          <div className="input-box">
            <label htmlFor="description" className="mb-[0.5rem]">
              Description
            </label>
            <textarea id="description" placeholder="Description Here" onChange={(e) => { formData.append("gameDesc", e.target.value) }}></textarea>
          </div>
          <div className="input-box">
            <label htmlFor="price" className="mb-[0.5rem]">
              Item Price
            </label>
            <input id="price" type="text" placeholder="Digital Awesome game" onChange={(e) => { formData.append("gamePrice", (e.target.value)) }} />
          </div>
          <div className="input-box">
            <label htmlFor="size" className="mb-[0.5rem]">
              Supply
            </label>
            <input id="size" type="text" placeholder="Digital Awesome game" onChange={(e) => { formData.append("gameSupply", (e.target.value)) }} />
          </div>

        </div>
        <button className="submit-button" type="submit" >Submit</button>
      </form>
    </div >
  );
}
