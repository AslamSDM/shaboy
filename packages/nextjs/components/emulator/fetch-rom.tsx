"use client";

import axios from 'axios';
import React, { useContext, useMemo, useState, FunctionComponent, SetStateAction, Dispatch } from 'react';
import { GbaContext } from 'react-gbajs';

type Props = { setRomLoaded: Dispatch<SetStateAction<boolean>> }

const FetchROM: FunctionComponent<Props> = ({ setRomLoaded }) => {
  const {
    play: playGba,
  } = useContext(GbaContext);

  const getGameRom = async (url: string): Promise<Uint8Array> => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    if (!response.ok) {
      throw new Error('Failed fetching ROM')
    }
    return new Uint8Array(buffer)
  }

  const load = async () => {
    const romurl = await axios.post("/api/load", {
      contract_address: "0x1234"
    });
    if (romurl.data.error) {
      return console.log(romurl.data.error);
    }

    console.log(romurl.data);

    const grom = await getGameRom(romurl.data);

    if (!grom) {
      throw new Error("fetched ROM is NULL or undefined")
    } else {
      setRomLoaded(true);
      playGba({ newRomBuffer: grom });
    }
  }

  useMemo(() => {
    load();
  }, []);

  return (
    <>
      {/* {!loaded && <p>Loading ...</p>} */}
    </>
  );
}

export default FetchROM;
