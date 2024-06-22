"use client";
import { useAccount } from '@starknet-react/core';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

interface Params {
    slug: string;
}

const PlayGame = dynamic(() => import("../../../components/emulator/PlayGame"), { ssr: false });

export default function Page({ params: { slug } }: { params: Params }) {

    // TODO
    // First check the auth of address to play game
    const [auth, setAuth] = useState(false);
    const [gameURI, setGameURI] = useState<string | null>(null);
    const [grombuff, setGrombuff] = useState<Uint8Array | null>(null);
    const {address,status} = useAccount();

    // console.log(slug);
    useEffect(() => {
        console.log(slug);
        if (slug === 'mario') setGameURI('http://localhost:3000/mario.gba');
        // token id to cdn 
        if (!address) return;
        

            setGameURI("/api/load?gameId="+slug);
    }, [slug,address]);
    return (
        <>  
            {!gameURI && "No Such Game"}
            {gameURI && <PlayGame gbaURI={gameURI} />}
        </>
    )
}