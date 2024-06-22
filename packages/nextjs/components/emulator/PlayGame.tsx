"use client";

import { GbaProvider } from 'react-gbajs'
import { FunctionComponent, useState } from "react";

import {
    DisplayControls,
    Emulator,
    FetchROM
} from "."

import { 
    FullScreen, 
    useFullScreenHandle 
} from "react-full-screen";

type Props = {
    gbaURI: string
    // grombuff: Uint8Array | null
}


const PlayGame: FunctionComponent<Props> = ({gbaURI}) => {
    const [romLoaded, setRomLoaded] = useState(false);
    const fullscreenHandle = useFullScreenHandle();

    const [zoom, setZoom] = useState<number>(2);

    const zoomIn = () => setZoom(zoom + 0.2);
    const zoomOut = () => setZoom(zoom - 0.2);

    return (
        <GbaProvider>
            <FetchROM setRomLoaded={setRomLoaded} gbaURI={gbaURI}/>
            <div className={`gameEmulator ${!romLoaded && 'rom-loading'}`}>
                <FullScreen handle={fullscreenHandle}>
                    <Emulator scale={zoom} printFps={false} />
                </FullScreen>
            </div>
            {
                romLoaded && 
                <DisplayControls 
                    handleFullScreen={fullscreenHandle.enter}
                    scaleUp={zoomIn}
                    scaleDown={zoomOut}
                 />
            }
        </GbaProvider>
    )
}

export default PlayGame;