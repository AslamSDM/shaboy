import { ArrowsPointingOutIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import React, { FunctionComponent, SetStateAction, Dispatch } from 'react';

type Props = {
    handleFullScreen: () => Promise<void>,
    scaleUp: () => void,
    scaleDown: () => void
}

const DisplayControls: FunctionComponent<Props> = ({ handleFullScreen, scaleUp, scaleDown }) => {

    return (
        <div className="flex flex-col w-[30px] fixed bottom-[65px] right-[30px] gap-[10px]">
            <div className="flex justify-center items-center bg-[#212638] w-[40px] h-[40px] text-[#fff] rounded-[10px] cursor-pointer p-[5px] hover:border-[3px] hover:border-[#2e4089]" onClick={() => { scaleUp() }}>
                <PlusIcon />
            </div>
            <div className="flex justify-center items-center bg-[#212638] w-[40px] h-[40px] text-[#fff] rounded-[10px] cursor-pointer p-[5px] hover:border-[3px] hover:border-[#2e4089]" onClick={() => { scaleDown() }}>
                <MinusIcon />
            </div>
            <div className="flex justify-center items-center bg-[#212638] w-[40px] h-[40px] text-[#fff] rounded-[10px] cursor-pointer p-[5px] hover:border-[3px] hover:border-[#2e4089]" onClick={handleFullScreen}>
                <ArrowsPointingOutIcon />
            </div>
        </div>
    );
}

export default DisplayControls;
