"use client";
import BannerArea from "~~/components/homepage/BannerArea";
import NewGames from "~~/components/homepage/NewItems";

import sal from "sal.js";
import { useEffect } from "react";


const Home = () => {

  useEffect(()=>{
    sal();
  });

  return (
    <>
      <BannerArea />
      <NewGames />
    </>
  );
};

export default Home;