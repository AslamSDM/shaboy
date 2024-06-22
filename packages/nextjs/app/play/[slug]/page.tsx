"use client";
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

    useEffect(() => {
        if (slug === 'mario') setGameURI('http://localhost:3000/mario.gba');
    }, [slug]);

    return (
        <>  
            {!gameURI && "No Such Game"}
            {gameURI && <PlayGame gbaURI={gameURI} />}
        </>
    )
}