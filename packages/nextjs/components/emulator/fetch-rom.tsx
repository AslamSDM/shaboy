"use client";

import React, { useContext, useMemo, useState, FunctionComponent, SetStateAction, Dispatch } from 'react';
import { GbaContext } from 'react-gbajs';

type Props = { setRomLoaded: Dispatch<SetStateAction<boolean>> }

const FetchROM: FunctionComponent<Props> = ({setRomLoaded}) => {
    const {
        play: playGba,
    } = useContext(GbaContext);

    const getGameRom = async (url: string): Promise<Uint8Array> => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed fetching ROM')
        }
        const buffer = await response.arrayBuffer();
        return new Uint8Array(buffer)
    }

    const load = async () => {
        const grom = await getGameRom("http://localhost:3000/mario.gba");
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