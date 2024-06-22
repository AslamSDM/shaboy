import { useState } from "react"
import GameSuggestCard from "../common/GameSuggestCard"
import MoodComponent from "./MoodComponent";

type Card = {
    image: string,
    url: string,
    name: string,
}

const loaderComponent = <div className='flex w-fit max-w-[80%] py-[10px] px-[15px] rounded-[20px] rounded-tl-[0px] bg-[#0000004d]'><img src="chat-loader.svg" /></div>

const AskAI = () => {

    const [loading, setLoading] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Card | null>(null);
    const [mood, setMood] = useState<string>('')
    const [inputed, setinputed] = useState(false);

    const aiSuggest = async (_user: string, _mood: string) => {
        console.log("suggesting...")
        const data = {
            userAddress: _user,
            emotion: _mood
        }
        const res = await fetch('http://localhost:3000/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return res.json();
    }

    const handleClick = async (mood: string) => {
        if (loading) return;
        setMood(mood)
        setinputed(true)
        setLoading(true)
        try {
            const response = await aiSuggest("0x06BBcC237bA2149dF038984b7d7fc63d2f8e75F548aA513c9a1aBE14BB9c8434", mood);

            const GameCard: Card = {
                image: `https://ipfs.io/ipfs/${response.selectedgame.metadata.image.replace('ipfs://', '')}`,
                url: "#",
                name: response.selectedgame.metadata.name
            }
            setSelectedGame(GameCard);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }

    return (
        <div className="flex w-full justify-center min-h-[100vh] pt-[50px]">
            <div className="flex flex-col w-[1000px] rounded-[10px] overflow-hidden mb-[100px] max-w-[95%]">
                <div className="flex flex-col py-[15px] px-[20px] bg-[#09090cb8] rounded-t-[10px]">
                    <div className="font-extrabold text-[2em] text-[#faedbec7]">Ask Shaboy AI.</div>
                    <div className="text-[#ffffff42] text-sm flex">Confused which game to play ?</div>
                </div>
                <div className="flex flex-col bg-[#13131d8c] p-[10px] px-[20px] gap-[10px] overflow-y-scroll askai-scroll rounded-b-[10px] pb-[50px] pt-[20px]">
                    <div className='flex w-fit max-w-[80%] py-[10px] px-[15px] rounded-[20px] rounded-tl-[0px] bg-[#0000004d]'>
                        Hello, I am shaboy AI. I can help you choose the game
                    </div>
                    <div className={`flex w-fit max-w-[80%] py-[10px] px-[15px] rounded-[20px] rounded-tl-[0px] bg-[#0000004d]`}>
                        Choose your mood !
                    </div>
                    {!inputed && <MoodComponent handleClick={handleClick} />}
                    {mood &&
                        <div className={`flex w-fit max-w-[80%] py-[10px] px-[15px] rounded-[20px] rounded-tl-[0px] bg-[#c4c4c44d] place-self-end`}>
                            {mood}
                        </div>
                    }
                    {loading && loaderComponent}
                    {selectedGame && <GameSuggestCard product={selectedGame} style="max-w-[200px]" />}

                </div>
            </div>
        </div>
    );
}

export default AskAI;