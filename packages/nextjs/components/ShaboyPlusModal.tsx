"use client";
import {
  BanknotesIcon,
  BoltIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const ShaboyPlusModal = () => {
  const { address: connectedAddress } = useAccount();
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>();
  console.log(connectedAddress);
  const { writeAsync } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "Eth",
        functionName: "approve",
        args: [
          "0x058ef05164a42914B6f0Bf7BB9d97A1e80F92c4113dc5F0b8E573B03aFbd22a6",
          1000000000000000,
        ],
      },
      {
        contractName: "ShaboySubscription",
        functionName: "add_subscription",
        args: [String(connectedAddress)],
      },
    ],
  });
  const totalCounter: any = useScaffoldReadContract({
    contractName: "ShaboySubscription",
    functionName: "get_subscription",
    args: [String(connectedAddress)],
  });
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      setSubscriptionStatus(totalCounter?.data);
      console.log(totalCounter);
      setSubscriptionStatus(Boolean(totalCounter));
    };

    if (connectedAddress) {
      fetchSubscriptionStatus();
    }
  }, [connectedAddress, totalCounter.isLoading]);

  const handleClick = async () => {
    console.log("inside handle click");
    await writeAsync();
  };
  return (
    <dialog id="shabow-plus" className="modal">
      <div className="shabow-plus-content modal-box flex flex-col items-center">
        <h3 className="flex font-bold text-[3em] py-[30px]">
          Shaboy <div className="text-[#f19d29] pl-[10px]">Plus +</div>
        </h3>
        <div className="flex flex-col w-full items-center">
          <div className="text-[3.5em] text-[#ffffffcc] font-bold">50</div>
          <div className="text-[#ffffff24]">USDT/month</div>
        </div>
        <div className="flex flex-col w-full p-[10px] items-center">
          <div className="flex flex-col w-[80%] gap-[10px] bg-[#2b34402b] p-[20px] rounded-[5px]">
            <div className="flex items-center">
              <div className="w-[25px] h-[25px]">
                <BanknotesIcon />
              </div>
              <div className="pl-[10px]">Play Any Game</div>
            </div>
            <div className="flex items-center">
              <div className="w-[25px] h-[25px]">
                <BoltIcon />
              </div>
              <div className="pl-[10px]">Premium Experience</div>
            </div>
            <div className="flex items-center">
              <div className="w-[25px] h-[25px]">
                <PlayCircleIcon />
              </div>
              <div className="pl-[10px]">Access to multiple game levels</div>
            </div>
          </div>
          <button onClick={handleClick} className="flex justify-center w-full mt-[30px] py-[15px] w-[80%] bg-[#3fbe1e] hover:bg-[#40942a] rounded-[10px] font-extrabold text-[1.2em]">
            Subscribe Now
          </button>
        </div>
      </div>

    </dialog>
  );
};

export default ShaboyPlusModal;
