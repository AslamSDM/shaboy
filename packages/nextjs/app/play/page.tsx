"use client";

import React, { useState } from 'react'
import ReactGbaJs from 'react-gbajs';
import { GbaProvider } from 'react-gbajs'

import {
    Emulator,
    InputROM,
    InputScale,
    Instructions,
    TogglePrintFps
} from "~~/components/emulator";


export default function PlayGame() {
    return (
        <GbaProvider>
            <Main />
        </GbaProvider>
    );
}

const Main = () => {
    const [printFps, setPrintFps] = useState(false)
    const [scale, setScale] = useState(1)

    return (
        <div
            style={{
                display: 'grid',
            }}
        >
            <InputROM />
            <Instructions />
            <TogglePrintFps printFps={printFps} setPrintFps={setPrintFps} />
            <InputScale scale={scale} setScale={setScale} />
            <Emulator scale={scale} printFps={printFps} />
        </div>
    )
}