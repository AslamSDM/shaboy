"use client";
import ProfilePage from "../../components/profile/Profile";

import sal from "sal.js";
import { useEffect } from "react";


const Home = () => {

  useEffect(()=>{
    sal();
  });

  return (
    <>
      <ProfilePage />
    </>
  );
};

export default Home;
