import { FunctionComponent, useEffect, useState } from "react"
import axios  from "axios"
import {useScaffoldMultiWriteContract} from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract"
type Game = {
    connectedAddress:string | undefined,
    id: number,
}

type Props = {
    game: Game
}
const  ListNowModal:FunctionComponent<Props> = ({ game })=> {
    const [price,setPrice] = useState(Number)
    const { writeAsync: list } = useScaffoldMultiWriteContract({
        calls: [
          {
            contractName: "ShaboyGames",
            functionName: "list",
            args: [game.id,price * 10 ** 18],
          },
        ],
      });
    const formData=new FormData()
    
    const list_nft = async () => {
        console.log({price})
        if (game.id && price && game.connectedAddress) {
          await list();
        }
        formData.append("token_id",String(game.id))
        formData.append("price",String(price))
        formData.append("seller_address",String(game.connectedAddress))
        formData.append("method","add")
        await axios.post("/api/create",formData)
      };
    
    return (
        <dialog id="list-now-modal" className="modal">
            <div className="shabow-plus-content modal-box flex flex-col items-center">
                <h3 className="flex font-bold text-[2em] pt-[30px]">List</h3>
                <span className="flex text-sm text-[#ffffff94]">List your games in Marketplace</span>
                <div className="flex flex-col w-full max-w-[80%] mt-[30px]">
                    <label className="mb-[8px] text-[#ffffff]" htmlFor="list-price">Listing price</label>
                    <input className="p-[10px] rounded-[5px] bg-[#ffffffed] text-[#000]" id="list-price" type="text" placeholder="0.002 ETH" onChange={(e)=>{setPrice(Number(e.target.value))}}  />
                </div>
                <div className="flex justify-center w-full py-[10px] bg-[#0058d2] hover:bg-[#1966d1] rounded-[10px] font-extrabold text-[1em] cursor-pointer max-w-[80%] mt-[25px]" onClick={list_nft}>
                    List
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className="border-none outline-0"></button>
            </form>
        </dialog>
    )
}

export default ListNowModal;