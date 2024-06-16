import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import React, { useContext, useMemo, useState, FunctionComponent, SetStateAction, Dispatch } from 'react';

type Props = { handleFullScreen: () => Promise<void> }

const DisplayControls: FunctionComponent<Props>= ({handleFullScreen}) =>  {

    return(
        <div className="display-control">
            <div className="display-control-icons" onClick={handleFullScreen}>
                <ArrowsPointingOutIcon />
            </div>
        </div>
    );
}

export default DisplayControls;