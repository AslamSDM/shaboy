const data = [{
    title: "Welcome to the world of SHABOY. The ultimate gaming platform",
    description: "Join us in revolutionalizing the web3 gaming landscape.",
    button: "Play Now",
    image: "https://www.etsy.com/uk/market/arcade_vector_art"
},
{
    title: "BUILD+TRADE+PLAY+EARN=SHABOY",
    description: "We are the worlds first build, trade and play to earn platform ",
    button: "Profile",
    image: "https://www.etsy.com/uk/market/arcade_vector_art"

},
{
    title: "Something that you havent seen before",
    description: "Web2 developers can build web3 games hassle free without learning blockchain through Shaboy abstraction. This welcomes 15 million web2 devs to web3",
    button: "Create a game",
    image: "https://www.etsy.com/uk/market/arcade_vector_art"

},
{
    title: "Join us in revolutionalizing the web3 gaming landscape",
    description: "Explore our platform to, Buy games play and earn. If you are a game developer, checkout our create games page",
    button: "Goto marketplace",
    image: "https://www.etsy.com/uk/market/arcade_vector_art"

},
{
    title: "Dont know what to play? SHABOY AI will help you",
    description: "SHABOY AI is a cutting edge AI chat bot which helps you  by suggesting games depending on your mood and previous gaming history",
    button: "Shaboy AI",
    image: "https://www.etsy.com/uk/market/arcade_vector_art"

},
]

const BannerArea = () => {
    return (
        <div className="flex justify-center items-center py-[45px] md:py-[80px] px-[20px] lg:px-[0px] pb-[80px]">
            <div className="flex flex-col-reverse md:flex-row md:max-w[90%] lg:max-w-[1140px] px-[16px]">
                <div className="content md:w-[60%] sm:px-[50px]">
                    <h2
                        className="pt-[25px] w-[90%] lg:max-w-[90%] text-[2.25em] font-normal leading-[1.2em]"
                        data-sal-delay="200"
                        data-sal="slide-up"
                        data-sal-duration="800"
                    >
                        {data.title}
                    </h2>
                    <p
                        className="pb-[30px] lg:max-w-[70%] text-[22px] text-[#ababab]"
                        data-sal-delay="300"
                        data-sal="slide-up"
                        data-sal-duration="800"

                    >
                        {data.description}
                    </p>
                    <a 
                        href="" 
                        className="mt-[20px] px-[34px] py-[15px] min-w-[160px] bg-[#00a3ff] rounded-[4px] hover:bg-[#005384]"
                        data-sal-delay="400"
                        data-sal="slide-up"
                        data-sal-duration="800"
                    >
                        {data.button}
                    </a>
                </div>
                <div className="md:pl-[7%] lg:px-[3%] sm:px-[50px]">
                    <div className="image">
                        <img src={data.image} className="max-h-[80vh] w-full" alt="shaboy" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerArea;