import Image from "next/image";
import Game from "~~/components/game/Game";

interface Params {
    slug: number;
}

const Main = ({ params: { slug } }: { params: Params })=> {

    const getMetadata=async()=>{
        
    }
    // slug == 'mario'
    return(
        <>
            {slug == "mario" ? <Game /> : "Game Not Found"}
        </>
    )
}

export default Main;