"use client";
import ProfilePage from "../../components/profile/Profile";

import sal from "sal.js";
import { useEffect } from "react";
import { useAccount } from "@starknet-react/core";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


const Home = () => {
  
  useEffect(()=>{
    sal();
  });
  
  const stats= useAccount()
  return (
    <>

      {stats.isConnected ? <ProfilePage />
      :(
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-bold">Please connect your wallet to continue</div>
        </div>
      )}
    </>
  );
};

export default Home;
