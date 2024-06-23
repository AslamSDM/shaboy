"use client";
import axios from "axios";
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
    image: string,
    price:number,
    seller:string
}

const Main = ({ params: { slug } }: { params: Params }) => {
    const formData = new FormData()
    const [gameMetadata, setGameMetadata] = useState<GameType | null>(null);
    const [price,setPrice]=useState()

    useEffect(() => {
        fetchGameData(slug)
        fetchGamePrice(slug)
    }, [slug])
const fetchGamePrice =async(id:number)=>{
    formData.append("token_id",String(slug))
    const response = await axios.post("/api/getprice",formData)
    setPrice(response.data)

}
    const fetchGameData = async (game_id: number) => {
        const data = {
            id: game_id
        }

        try {
            const res = await fetch('/api/findGameFromID', {
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
                price:price?price:0,
                seller:game.metadata.seller
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