"use client";
import { useAccount } from "@starknet-react/core";
import axios from "axios";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { set } from "nprogress";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Params {
  slug: string;
}

const PlayGame = dynamic(
  () => import("../../../components/emulator/PlayGame"),
  { ssr: false }
);

export default function Page({ params: { slug } }: { params: Params }) {
  const { address, isConnected } = useAccount();


  // TODO
  // First check the auth of address to play game
  const [auth, setAuth] = useState(false);
  const [gameURI, setGameURI] = useState<string | null>(null);
  const [grombuff, setGrombuff] = useState<Uint8Array | null>(null);
  const [ownedGame, setOwnedGame] = useState(false);
  // console.log(slug);
  useEffect(() => {
    console.log(slug);
    // if (slug === 'mario') setGameURI('http://localhost:3000/mario.gba');
    // token id to cdn

    
    const getOwner = async () => {
      if(!address) return;
      const formData = new FormData();
      formData.append("addr", String(address));
      formData.append("token_id", slug.toString());
      const res = await axios.post("/api/check", formData);
      console.log(res.data);
      setOwnedGame(res.data);
    };
    
    getOwner();
    if (!address) {
      toast.error("Please connect your wallet to continue");
    }
    if (!ownedGame) return;
    setGameURI("/api/load?gameId=" + slug);
  }, [slug, address]);
  return (
    <>
      {!gameURI && "No Such Game"}
      {gameURI && <PlayGame gbaURI={gameURI} />}
    </>
  );
}
