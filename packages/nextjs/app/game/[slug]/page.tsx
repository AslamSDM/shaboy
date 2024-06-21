import Image from "next/image";
import Game from "~~/components/game/Game";

interface Params {
    slug: string;
}

const Main = ({ params: { slug } }: { params: Params })=> {
    // slug == 'mario'
    return(
        <>
            {slug == "mario" ? <Game /> : "Game Not Found"}
        </>
    )
}

export default Main;