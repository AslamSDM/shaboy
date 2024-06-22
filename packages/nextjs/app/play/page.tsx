"use client";
// Import dynamic for client-side only components
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// Dynamically import the GbaProvider to ensure it's client-side only
const GbaProvider = dynamic(() => import('react-gbajs').then(mod => mod.GbaProvider), {
  ssr: false,
});

// Dynamically import client-side only components
const InputROM = dynamic(() => import('~~/components/emulator').then(mod => mod.InputROM), { ssr: false });
const Instructions = dynamic(() => import('~~/components/emulator').then(mod => mod.Instructions), { ssr: false });
const TogglePrintFps = dynamic(() => import('~~/components/emulator').then(mod => mod.TogglePrintFps), { ssr: false });
const InputScale = dynamic(() => import('~~/components/emulator').then(mod => mod.InputScale), { ssr: false });
const Emulator = dynamic(() => import('~~/components/emulator').then(mod => mod.Emulator), { ssr: false });

const Main = () => {
    const [printFps, setPrintFps] = useState(false);
    const [scale, setScale] = useState(1);

    return (
        <div style={{ display: 'grid', }}>
            <InputROM />
            <Instructions />
            <TogglePrintFps printFps={printFps} setPrintFps={setPrintFps} />
            <InputScale scale={scale} setScale={setScale} />
            <Emulator scale={scale} printFps={printFps} />
        </div>
    );
};

export default function PlayGame() {
    return (
        <GbaProvider>
            <Main />
        </GbaProvider>
    );
}