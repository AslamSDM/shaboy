// import { useState, useRef } from "react"
// type DataType = { type: string; data: string; }[]

// const ai = [
//     {
//         type: "bot",
//         data: "Hello, i am Shaboy bot."
//     },
//     {
//         type: "bot",
//         data: "What is your mood ?"
//     },
// ]

const moods = [
    "Happy",
    "Sad",
    "Bored",
    "Surprise",
    "Gratitude",
    "Anger",
    "Fear",
]

const MoodComponent = () => {

    const handleClick = (mood: string)=> {
        // Send and retrieve AI call
        console.log(mood)
    }

    return (
        <div className="flex flex-wrap max-w-[80%]">
            {
                moods.map((mood, i) => {
                    return (
                        <div className="flex flx-wrap w-fit py-[5px] px-[10px] bg-[#242435] mr-[5px] mt-[5px] rounded-[5px] hover:bg-[#2f2f48] pointer cursor-pointer" key={i} onClick={()=>{handleClick(mood)}}>{mood}</div>
                    )
                })
            }
        </div>
    )
}

const AskAI = () => {

    // const [input, setInput] = useState("");
    // const [data, setData] = useState<DataType>(ai);
    // const messagesEndRef = useRef<null | HTMLDivElement>(null);

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollTo({
    //         top: 10000,
    //         left: 0,
    //         behavior: "smooth"
    //     })
    // };

    // const pushConversation = (txt) => {
    //     const _data = [
    //         ...data,
    //         {
    //             type: "user",
    //             data: txt
    //         }
    //     ];

    //     setData(_data);
    //     setInput("");
    //     scrollToBottom();
    // }

    // const handleEnter = (e: KeyboardEvent) => {
    //     if (e.key !== 'Enter') return;
    //     pushConversation(input);
    // }

    return (
        <div className="flex justify-center min-h-[100vh] pt-[50px] max-w-[95%]">
            <div className="flex flex-col w-[500px] h-[500px] rounded-[10px] overflow-hidden mb-[100px]">
                <div className="flex flex-col py-[15px] px-[20px] bg-[#09090cb8] rounded-t-[10px]">
                    <div className="font-extrabold text-[2em] text-[#faedbec7]">Ask Shaboy.</div>
                    <div className="text-[#ffffff42] text-sm flex">Confused which game to play ?</div>
                </div>
                <div className="flex flex-col bg-[#13131d8c] p-[10px] px-[20px] gap-[10px] overflow-y-scroll askai-scroll rounded-b-[10px] pb-[50px] pt-[20px]">
                    {/* {
                        data.map((e) => {
                            const isBot = e.type == "bot" ? true : false;
                            return (
                                <div className={`flex w-fit max-w-[80%] py-[10px] px-[15px] rounded-[20px] ${isBot ? 'rounded-tl-[0px]' : 'rounded-tr-[0px]'} ${!isBot && 'place-self-end'} ${isBot ? 'bg-[#0000004d]' : 'bg-[#3434344d]'}`}>
                                    {e.data}
                                </div>
                            )
                        })
                    }
                    <div ref={messagesEndRef} style={{ float: "left", clear: "both" }}></div> */}
                    <div className={`flex w-fit max-w-[80%] py-[10px] px-[15px] rounded-[20px] rounded-tl-[0px] bg-[#0000004d]`}>
                        Hello, I am shaboy bot. I can help you chhose the game
                    </div>
                    <div className={`flex w-fit max-w-[80%] py-[10px] px-[15px] rounded-[20px] rounded-tl-[0px] bg-[#0000004d]`}>
                        Choose the mood !
                    </div>
                    <MoodComponent />
                </div>
                {/* <div className="flex bg-[#13131d8c] px-[10px]">
                    <input className="w-full px-[20px] py-[10px] mb-[10px] border-none outline-none bg-[#3434344d] rounded-[10px]" type="text" placeholder="Hi, which game i can play ?" onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} value={input} />
                </div> */}
            </div>
        </div>
    );
}

export default AskAI;