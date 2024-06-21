const Game = () => {
    return (
        <div className="flex flex-col items-center py-[25px] px-[15px] sm:px-[40px] md:flex-row md:items-start lg:px-[150px]">
            <div className="flex aspect-square p-[15px] bg-[#24243557] rounded-[15px] max-w-[85%] md:max-w-[50%] lg:max-w-[40%]">
                <img className="w-full object-cover rounded-[7px]" src="https://i.pinimg.com/originals/3a/c8/83/3ac883cd85d3e2fed8141fe2c2f28d06.jpg" alt="" />
            </div>
            <div className="w-full flex flex-col pt-[25px] max-w-[85%] md:max-w-[50%] md:pl-[40px]">
                <div>
                    <h2 className="text-[1.75em] font-extrabold">Super Mario</h2>
                </div>
                <div className="text-[#b9b9b8e0] text-[1.25em]">
                    <p>
                        Super Mario is a platform game series created by Nintendo starring their mascot, Mario. It is the central series of the greater Mario franchise. At least one Super Mario game has been released for every major Nintendo video game console.
                    </p>
                </div>
                <div className="flex items-end">
                    <div className="text-[1.5em] text-[#ffffffd9] font-bold">0.02 ETH</div>
                </div>
                <div className="pt-[20px]">
                    <div className="flex justify-center py-[15px] w-full bg-[#3fbe1e] hover:bg-[#40942a] rounded-[10px] font-extrabold text-[1.2em]">
                        Buy Now
                    </div>
                </div>
                {/* <div className="pt-[20px]">
                    <div className="flex justify-center py-[15px] w-full bg-[#3fbe1e] hover:bg-[#40942a] rounded-[10px] font-extrabold text-[1.2em]">
                        Play Now
                    </div>
                </div> */}
            </div>

        </div>
    )
}

export default Game;