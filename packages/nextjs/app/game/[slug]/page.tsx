"use client";
import { useEffect, useState } from "react";
import Game from "~~/components/game/Game";

interface Params {
    slug: number;
}

type GameType = {
    id: number,
    name: string,
    description: string,
    supply: number,
    image: string
}

const Main = ({ params: { slug } }: { params: Params }) => {

    const [gameMetadata, setGameMetadata] = useState<GameType | null>(null);

    useEffect(() => {
        fetchGameData(slug)
    }, [slug])

    const fetchGameData = async (game_id: number) => {
        const data = {
            id: game_id
        }

        try {
            const res = await fetch('http://localhost:3000/api/findGameFromID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const _data = await res.json();
            const game = _data.game[0];

            const _game:GameType = {
                id:game.id,
                name:game.name,
                description:game.metadata.description,
                image: `https://ipfs.io/ipfs/${game.metadata.image.replace('ipfs://', '')}`,
                supply:game.metadata.supply,
            }

            setGameMetadata(_game);

        } catch (e) {
            console.log("Error !");
        }

    }

    return (
        <>
            {gameMetadata && <Game game={gameMetadata} />}
        </>
    )
}

export default Main;