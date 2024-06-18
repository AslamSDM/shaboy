"use client";
import { FunctionComponent, useEffect } from 'react';
import ReactGbaJs from 'react-gbajs';

type Props = { scale: number, printFps: boolean }

const Emulator: FunctionComponent<Props> = ({ scale, printFps }) => {
    const fpsReportCallback = (
        printFps
            ? (fps: number) => console.log('FPS', fps)
            : undefined
    )

    useEffect(() => {
        const canvas = document.querySelector(".gameEmulator canvas");
        canvas?.setAttribute("style", "transform-origin: 50% 50%; transform: scale(2)");
    }, []);

    return (
        <ReactGbaJs
            onFpsReported={fpsReportCallback}
            scale={scale}
            volume={0}
            watchLogLevels={{ error: true, warn: true }}
            onLogReceived={(level, message) => { console.log(`Received a log level ${level} with the message "${message}"`) }}
        />
    )
}

export default Emulator