const ListNowModal = () => {
    return (
        <dialog id="list-now-modal" className="modal">
            <div className="shabow-plus-content modal-box flex flex-col items-center">
                <h3 className="flex font-bold text-[2em] pt-[30px]">List</h3>
                <span className="flex text-sm text-[#ffffff94]">List your games in Marketplace</span>
                <div className="flex flex-col w-full max-w-[80%] mt-[30px]">
                    <label className="mb-[8px] text-[#ffffff]" htmlFor="list-price">Listing price</label>
                    <input className="p-[10px] rounded-[5px] bg-[#ffffffed] text-[#000]" id="list-price" type="text" placeholder="0.002 ETH"/>
                </div>
                <div className="flex justify-center w-full py-[10px] bg-[#0058d2] hover:bg-[#1966d1] rounded-[10px] font-extrabold text-[1em] cursor-pointer max-w-[80%] mt-[25px]">
                    List
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className="border-none outline-0"></button>
            </form>
        </dialog>
    )
}

export default ListNowModal;