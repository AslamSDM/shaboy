import { FunctionComponent } from "react";

const moods = [
    "Happy",
    "Sad",
    "Bored",
    "Surprise",
    "Gratitude",
    "Anger",
    "Fear",
]

type Props = {
    handleClick: (mood: string) => void
}

const MoodComponent: FunctionComponent<Props> = ({ handleClick }) => {


    return (
        <div className="flex flex-wrap max-w-[80%]">
            {
                moods.map((mood, i) => {
                    return (
                        <div className="flex flx-wrap w-fit py-[5px] px-[10px] bg-[#242435] mr-[5px] mt-[5px] rounded-[5px] hover:bg-[#2f2f48] pointer cursor-pointer" key={i} onClick={() => { handleClick(mood) }}>{mood}</div>
                    )
                })
            }
        </div>
    )
}

export default MoodComponent;