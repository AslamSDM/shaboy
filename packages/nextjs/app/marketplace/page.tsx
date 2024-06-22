"use client";
import { useEffect, useState } from "react";
import ProductCard from "~~/components/common/ProductCard";
import sal from "sal.js";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useAccount } from "@starknet-react/core";
import axios from "axios";


const MarketPlace = () => {
  const [price, setPrice] = useState(Number);
  const [token_id, setTokenId] = useState(Number);
  const [metadata, setMetadata] = useState<any[]>([]);
  const connectedAddress = useAccount();
  const { writeAsync: list } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "ShaboyGames",
        functionName: "list",
        args: [token_id, price * 10 ** 18],
      },
    ],
  });

  const { writeAsync: buy } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "Eth",
        functionName: "approve",
        args: [String(connectedAddress), price * 10 ** 18],
      },
      {
        contractName: "ShaboyGames",
        functionName: "buy_nft",
        args: [token_id, price * 10 ** 18],
      },
    ],
  });

  const buy_nft = (token_id: number, price: number) => {
    if (token_id && price && connectedAddress) setPrice(price);
    setTokenId(token_id);
    buy();
  };

  const list_nft = (token_id: number, price: number) => {
    if (token_id && price && connectedAddress) setPrice(price);
    setTokenId(token_id);
    list();
  };


  useEffect(() => {
    const get_new_listing = async () => {
        const newform = new FormData();
        newform.append("method", "get");
    
        const res = await axios.post(
          "/api/create",
            newform
        );
        if (res.data) {
            console.log("xxxxxxxxxxxx",res.data)
          setMetadata(res.data);
        } else console.log("ERROR");
      };
    
    sal();
    get_new_listing();
  },[]);

  return (
    <div className="flex flex-col min-h-[100vh] p-[50px]">
      <div className="flex pb-[30px]">
        <h2 className="text-[2em]">Market Place</h2>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full flex flex-col sm:flex-row py-[30px] md:py-[60px] gap-[2.25rem] px-[30px] sm:px-[60px] sm:flex-wrap">
          {metadata.map((product, i) => {
            return (
              <ProductCard
                product={product}
                key={i}
                style={"sm:w-[45%] lg:w-[25%] xl:w-[20%]"}
                animation={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
