"use client";
import { useEffect,useState } from "react";
import ProductCard from "~~/components/common/ProductCard";
import sal from "sal.js";
import {useScaffoldReadContract} from "~~/hooks/scaffold-stark/useScaffoldReadContract"
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useAccount } from "@starknet-react/core";
import axios from "axios";
const products = [
    {
        image: "https://static.javatpoint.com/top10-technologies/images/top-10-games-in-the-world1.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://scopely-website.s3.eu-west-2.amazonaws.com/_resized/qobt2OWZZCY7DrqtE5EyGuAbfMVrGYmTK2CeUJJM-w700-q75.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://static.javatpoint.com/top10-technologies/images/top-10-games-in-the-world1.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://static.javatpoint.com/top10-technologies/images/top-10-games-in-the-world1.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://scopely-website.s3.eu-west-2.amazonaws.com/_resized/qobt2OWZZCY7DrqtE5EyGuAbfMVrGYmTK2CeUJJM-w700-q75.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://i.guim.co.uk/img/media/7c2ab1a3e60e445caf0a4d3de302591e830e8f7f/0_0_3800_2280/master/3800.jpg?width=480&dpr=1&s=none",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    }
]


const MarketPlace = () => {
    const [price,setPrice]=useState(Number)
    const [token_id,setTokenId]=useState(Number)
    const connectedAddress = useAccount()
const {writeAsync:list}=useScaffoldMultiWriteContract({
    calls:[
        {
            contractName:"ShaboyGames",
            functionName:"list",
            args:[token_id,price*10**18]
        }
    ]

})


const {writeAsync:buy}=useScaffoldMultiWriteContract({
    calls:[
        {
            contractName:"Eth",
            functionName:"approve",
            args:[String(connectedAddress),price*10**18]
        },
        {
            contractName:"ShaboyGames",
            functionName:"buy_nft",
            args:[token_id,price*10**18]
        }
    ]

})

const buy_nft=(token_id:number,price:number)=>{
    if(token_id && price && connectedAddress)
        setPrice(price)
        setTokenId(token_id)
        buy()

}

const list_nft=(token_id:number,price:number)=>{
    if(token_id && price && connectedAddress)
        setPrice(price)
        setTokenId(token_id)
        list()

}
const get_allmeta_data=async(data:number[])=>{
    
}
const get_active_listing=async()=>{
    const res = await axios.post("/api/create", {
        method:"get"
      });

}

    useEffect(()=>{
        sal();
      });

    return (
        <div className="flex flex-col min-h-[100vh] p-[50px]">
            <div className="flex pb-[30px]">
                <h2 className="text-[2em]">Market Place</h2>
            </div>
            <div className="flex justify-center w-full">
                <div className="w-full flex flex-col sm:flex-row py-[30px] md:py-[60px] gap-[2.25rem] px-[30px] sm:px-[60px] sm:flex-wrap">
                    {
                        products.map((product, i) => {
                            return (
                                <ProductCard product={product} key={i} style={'sm:w-[45%] lg:w-[25%] xl:w-[20%]'} animation={true} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MarketPlace;