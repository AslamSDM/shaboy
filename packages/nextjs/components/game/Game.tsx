import { FunctionComponent, useEffect, useState } from "react"
import ListNowModal from "./ListModal"
import axios from "axios"
import { useAccount, useNetwork } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import {useScaffoldMultiWriteContract} from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract"
import { id } from "ethers";
type Game = {
    id: number,
    name: string,
    description: string,
    supply: number,
    image: string,
    price:number,
    seller:string
}

type Props = {
    game: Game
}

const Game: FunctionComponent<Props> = ({ game }) => {
    const formData=new FormData()
    const router = useRouter();
    const { address, status: walletConnectionStatus, chainId } = useAccount();
    const [isBought, setIsBought] = useState(false);
    const { address: connectedAddress } = useAccount();


  
    const { writeAsync: buy } = useScaffoldMultiWriteContract({
      calls: [
        {
          contractName: "Eth",
          functionName: "approve",
          args: [connectedAddress, game.price * 10 ** 18],
        },
        {
          contractName: "ShaboyGames",
          functionName: "buy_nft",
          args: [game.id, game.price * 10 ** 18],
        },
      ],
    });
  
    const buy_nft = async () => {
      if (game.id && game.price && connectedAddress) {
        buy();
      }
      formData.append("token_id", game.id.toString());
      formData.append("seller_addr", game.seller.toString());
      formData.append("buyer_addr",String(connectedAddress))
      formData.append("method","update")
      
      await axios.post("/api/create/update_owner", formData);
    };
  

    useEffect(() => {
        if (walletConnectionStatus == 'connected' && address) {
            formData.append("addr",address)
            formData.append("token_id",game?.id.toString())
            const getOwner=async()=>{
                const res=  (await (axios.post("/api/check",formData)))
                console.log(res.data)
                 setIsBought((res.data))
            }
            getOwner()
        }

           
    }, [address])

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
                        <div className="flex justify-center py-[15px] w-full bg-[#3fbe1e] hover:bg-[#40942a] rounded-[10px] font-extrabold text-[1.2em] cursor-pointer" onClick={buy_nft}>
                            Buy Now
                        </div>
                    </div>
                }
                {
                    isBought &&
                    <div className="pt-[20px]">
                        <div onClick={(e)=>{
                            e.preventDefault();
                            router.push(`/play/${game.id}`)
                        }} className="flex justify-center py-[15px] w-full bg-[#3fbe1e] hover:bg-[#40942a] rounded-[10px] font-extrabold text-[1.2em] cursor-pointer">
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
                <ListNowModal game={{connectedAddress:connectedAddress,id:game.id}} />
            </div>

        </div>
    )
}

export default Game;