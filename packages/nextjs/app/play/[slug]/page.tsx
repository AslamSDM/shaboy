"use client";
import { useAccount } from '@starknet-react/core';
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
    const {address} = useAccount();
    useEffect(() => {
        if (slug === 'mario') setGameURI('http://localhost:3000/mario.gba');
        // token id to cdn 
        if (!Number.isNaN(Number(slug))) {
            return;
        }
        async function fetchGameURI() {
            const uri = await fetch(`http://localhost:3000/api/load/${slug}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userAddress: address,gameid : slug }),
            });
            

        }
        fetchGameURI();
    }, [slug]);

    return (
        <>  
            {!gameURI && "No Such Game"}
            {gameURI && <PlayGame gbaURI={gameURI} />}
        </>
    )
}