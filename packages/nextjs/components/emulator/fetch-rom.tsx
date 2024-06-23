"use client";

import { g } from "@starknet-react/core/dist/index-79NvzQC9";
import React, {
  useContext,
  useMemo,
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { GbaContext } from "react-gbajs";

type Props = {
  setRomLoaded: Dispatch<SetStateAction<boolean>>;
  gbaURI: string;
  // grombuff: Uint8Array | null
};

const FetchROM: FunctionComponent<Props> = ({ setRomLoaded, gbaURI }) => {
  const { play: playGba } = useContext(GbaContext);
  function base64ToBuffer(base64: string) {
    // const binaryString = Buffer.from(base64, 'base64').toString('hex');
    //   const len = binaryString.length;
    // const bytes = new Uint8Array(len);
    // for (var i = 0; i < len; i++) {
    //   bytes[i] = binaryString.charCodeAt(i);
    // }
    // return bytes;
    // Decode the base64 string to a Buffer object
    const binaryString = Buffer.from(base64, "base64").toString("binary");
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const arrayBuffer = bytes
    return arrayBuffer;
  }

  const getGameRom = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error("Failed fetching ROM");
    }
    const buffer = base64ToBuffer(data.data);
    console.log(buffer)
    // console.log(new Uint8Array(buffer));
    // return new Uint8Array(buffer)  
    return buffer
  };

  const load = async () => {
    const grom = await getGameRom(gbaURI);
    // const grom = grombuff
    if (grom === undefined || grom === null) {
      throw new Error("fetched ROM is NULL or undefined");
    } else {
      setRomLoaded(true);
      console.log(grom)
      playGba({ newRomBuffer: new Uint8Array(grom) });
    }
  };

  useMemo(() => {
    load();
  }, [gbaURI]);

  return <>{/* {!loaded && <p>Loading ...</p>} */}</>;
};

export default FetchROM;
