import { FunctionComponent, useEffect, useState } from "react"
import ListNowModal from "./ListModal"

import { useAccount, useNetwork } from "@starknet-react/core";


type Game = {
    id: number,
    name: string,
    description: string,
    supply: number,
    image: string
}

type Props = {
    game: Game
}

const Game: FunctionComponent<Props> = ({ game }) => {

    const { address, status: walletConnectionStatus, chainId } = useAccount();
    const [isBought, setIsBought] = useState(true);
    const [loading, setLoading] = useState(false);

    const isOwnedByAddress = (addr: string, game_id: number) => {
        
    }

    useEffect(() => {
        // if (walletConnectionStatus == 'connected' && address) 
    }, [])

    console.log(address, walletConnectionStatus, chainId)

    return (
        <div className="flex flex-col items-center py-[25px] px-[15px] sm:px-[40px] md:flex-row md:items-start lg:px-[150px]">
            <div className="flex aspect-square p-[15px] bg-[#24243557] rounded-[15px] max-w-[85%] md:max-w-[50%] lg:max-w-[40%]">
                <img className="w-full object-cover rounded-[7px]" src={game.image} alt="" />
            </div>
            <div className="w-full flex flex-col pt-[25px] max-w-[85%] md:max-w-[50%] md:pl-[40px]">
                <div>
                    <h2 className="text-[1.75em] font-extrabold">{game.name}</h2>
                </div>
                <div className="text-[#b9b9b8e0] text-[1.25em]">
                    <p>{game.description}</p>
                </div>
                {/* <div className="flex items-end">
                    <div className="text-[1.5em] text-[#ffffffd9] font-bold">0.02 ETH</div>
                </div> */}
                {
                    !isBought &&
                    <div className="pt-[20px]">
                        <div className="flex justify-center py-[15px] w-full bg-[#3fbe1e] hover:bg-[#40942a] rounded-[10px] font-extrabold text-[1.2em] cursor-pointer">
                            Buy Now
                        </div>
                    </div>
                }
                {
                    isBought &&
                    <div className="pt-[20px]">
                        <div className="flex justify-center py-[15px] w-full bg-[#3fbe1e] hover:bg-[#40942a] rounded-[10px] font-extrabold text-[1.2em] cursor-pointer">
                            Play Now
                        </div>
                    </div>
                }

                {
                    isBought &&
                    <div className="pt-[20px]">
                        <div
                            className="flex justify-center py-[15px] w-full bg-[#0058d2] hover:bg-[#1966d1] rounded-[10px] font-extrabold text-[1.2em] cursor-pointer"
                            onClick={() => {
                                const listnow = document.getElementById('list-now-modal') as HTMLDialogElement | null;
                                if (listnow != null) listnow.showModal();
                            }}
                        >
                            List in marketplace
                        </div>
                    </div>
                }
                <ListNowModal />
            </div>

        </div>
    )
}

export default Game;