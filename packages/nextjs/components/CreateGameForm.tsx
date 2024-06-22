"use client";

import { useState } from "react";

export default function CreateGameForm() {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="createGame flex bg-yellow justify-center flex-col md:flex-row mx-[30px] my-[50px] md:my-[100px]">
            {/* UPLOAD FILE */}
            <div className="file-upload-wrapper">
                <h6 className="title">Upload file</h6>
                <p className="">Drag or choose your file to upload</p>
                <div className="file-upload-inputs">
                    <div className="filex-input">
                        <label htmlFor="gameImage" className="mb-[0.5rem] block">Game NFT Image</label>
                        <input id="gameImage" type="file"></input>
                    </div>
                    <div className="filex-input">
                        <label htmlFor="game" className="mb-[0.5rem] block">Game File</label>
                        <input type="file"></input>
                    </div>
                </div>
            </div>

            {/* FORM FIELDS */}
            <div className="createGameForm flex flex-col mx-[15px]">
                <div className="input-box">
                    <label htmlFor="name" className="mb-[0.5rem]">Produnction name</label>
                    <input id="name" type="text" placeholder="Digital Awesome game" />
                </div>
                <div className="input-box">
                    <label htmlFor="description" className="mb-[0.5rem]">Discription</label>
                    <textarea id="description" placeholder="Description Here"></textarea>
                </div>
                <div className="input-box">
                    <label htmlFor="price" className="mb-[0.5rem]">Item Price</label>
                    <input id="price" type="text" placeholder="Digital Awesome game" />
                </div>
                <div className="input-box flex items-center">
                    <input id="token" type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                    <label htmlFor="token" className="ml-[10px]">Do you want to deploy token ?</label>
                </div>
                <div className={`input-box ${isChecked ? 'flex flex-col' : 'hidden'}`}>
                    <label htmlFor="token-name" className="mb-[0.5rem]">Token Name</label>
                    <input id="token-name" type="text" placeholder="Tether" />
                </div>
                <div className={`input-box ${isChecked ? 'flex flex-col' : 'hidden'}`}>
                    <label htmlFor="token-symbol" className="mb-[0.5rem]">Token Symbol</label>
                    <input id="token-symbol" type="text" placeholder="USDT" />
                </div>
                <div className={`input-box ${isChecked ? 'flex flex-col' : 'hidden'}`}>
                    <label htmlFor="total-supply" className="mb-[0.5rem]">Token Supply</label>
                    <input id="total-supply" type="text" placeholder="1000000" />
                </div>

                <button className="submit-button">Submit</button>
            </div>
        </div>

    );
}