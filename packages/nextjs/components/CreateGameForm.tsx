"use client";

export default function CreateGameForm() {
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
                <div className="input-box">
                    <label htmlFor="size" className="mb-[0.5rem]">Size</label>
                    <input id="size" type="text" placeholder="Digital Awesome game" />
                </div>

                <button className="submit-button">Submit</button>
            </div>
        </div>

    );
}