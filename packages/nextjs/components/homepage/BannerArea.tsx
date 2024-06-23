import { useState } from "react";

const data = [{
    title: "Welcome to the world of Shaboy. The ultimate gaming platform",
    description: "Join us in revolutionalizing the web3 gaming landscape.",
    button: "Play Now",
    url: "/profile",
    image: "images/img1.png"
},
{
    title: "BUILD + TRADE + PLAY + EARN = SHABOY",
    description: "We are the worlds first build, trade and play to earn platform ",
    button: "Profile",
    url: "/profile",
    image: "images/img2.png"

},
{
    title: "Something that you havent seen before!",
    description: "Web2 developers can build web3 games hassle free without learning blockchain through Shaboy abstraction. This welcomes 15 million web2 devs to web3",
    button: "Create a game",
    url: "/create",
    image: "images/img3.png"

},
{
    title: "Join us in revolutionalizing the web3 gaming landscape",
    description: "Explore our platform to, Buy games play and earn. If you are a game developer, checkout our create games page",
    button: "Goto marketplace",
    url: "/marketplace",
    image: "images/img4.png"

},
{
    title: "Don't know what to play? Shaboy AI will help you",
    description: "SHABOY AI is a cutting edge AI chat bot which helps you  by suggesting games depending on your mood and previous gaming history",
    button: "Shaboy AI",
    url: "/suggest-game",
    image: "images/img5.png"

}]

const BannerArea = () => {

    const [count, setCount] = useState(0);

    setTimeout(() => {
        count + 1 < data.length ? setCount(count + 1) : setCount(0);
    }, 8000);

    return (
        <div className="flex justify-center items-center py-[45px] md:py-[80px] px-[20px] lg:px-[0px] pb-[80px]">
            <div className="flex flex-col-reverse md:flex-row md:max-w[90%] lg:max-w-[1140px] px-[16px]">
                <div className="md:w-[60%] sm:px-[50px]">
                    <h2
                        className="leading-[1.2em] pt-[25px] w-[90%] lg:max-w-[90%] text-[2.25em] font-normal"
                        data-sal-delay="200"
                        data-sal="slide-up"
                        data-sal-duration="800"
                    >
                        {data[count].title}
                    </h2>
                    <div className=""
                        data-sal-delay="300"
                        data-sal="slide-up"
                        data-sal-duration="800">
                        <p
                            className="text-[22px] text-[#ababab] pb-[30px] lg:max-w-[70%]">
                            {data[count].description}
                        </p>
                        <a
                            href={data[count].url}
                            className="rounded-[4px] mt-[20px] px-[34px] py-[15px] min-w-[160px] bg-[#00a3ff] hover:bg-[#005384]"
                        >
                            {data[count].button}
                        </a>
                    </div>
                </div>
                <div className="md:pl-[7%] lg:px-[3%] sm:px-[50px]">
                    <div className="w-full relative">
                        {
                            data.map((e, i)=>{
                                return(
                                    <img id="BannerImage" src={e.image} className={`max-h-[80vh] w-full rounded-[10px] opacity-0 ${count == i ? 'fadeIn':'hidden'}`} alt="shaboy" />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerArea;