"use client";

import React, { useContext, useMemo, FunctionComponent, SetStateAction, Dispatch } from 'react';
import { GbaContext } from 'react-gbajs';

type Props = { 
    setRomLoaded: Dispatch<SetStateAction<boolean>>,
    gbaURI: string
 }

const FetchROM: FunctionComponent<Props> = ({setRomLoaded, gbaURI}) => {
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
        console.log(gbaURI);
        const grom = await getGameRom(gbaURI);
        if (!grom) {
            throw new Error("fetched ROM is NULL or undefined")
        } else {
            setRomLoaded(true);
            playGba({ newRomBuffer: grom });
        }
    }

    useMemo(() => {
        load();
    },[]);

  return (
    <>
      {/* {!loaded && <p>Loading ...</p>} */}
    </>
  );
}

export default FetchROM;
