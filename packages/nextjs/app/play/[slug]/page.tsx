"use client";

import { useEffect, useState } from "react";
import { GbaProvider } from 'react-gbajs'
import {
    DisplayControls,
    Emulator,
    FetchROM,
    Instructions
} from "~~/components/emulator";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

interface Params {
    slug: string;
}

export default function Page({ params: { slug } }: { params: Params }) {

    // TODO
    // First check the auth of address to play game
    const [auth, setAuth] = useState(false);
    const [romLoaded, setRomLoaded] = useState(false);

    const fullscreenHandle = useFullScreenHandle();

    useEffect(() => {
        if (slug == 'mario') {
            setAuth(true);
        } else {
            console.log("No such game", slug);
        }
    }, []);

    return (
        <GbaProvider>
            {auth && <FetchROM setRomLoaded={setRomLoaded} />}
            {!auth && <>Please Buy the Game first</>}
            <div className={`gameEmulator ${!romLoaded && 'rom-loading'}`}>
                <FullScreen handle={fullscreenHandle}>
                    <Emulator scale={1} printFps={false} />
                </FullScreen>
            </div>
            {romLoaded && <DisplayControls handleFullScreen={fullscreenHandle.enter} />}
        </GbaProvider>
    )
}