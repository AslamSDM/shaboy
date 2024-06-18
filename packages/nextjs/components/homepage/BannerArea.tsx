const data = {
    title: "Discover Digital Art, Collect and Sell Your Specific NFTs.",
    description: "Partner with one of the world’s largest retailers to showcase your brand and products.",
    button: "Play Now",
    image: "https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?t=st=1718720325~exp=1718723925~hmac=d70fd16b1ae7e47f19d6d40918252b7980d3bcd9d65fc1af9c86f898b44d482b&w=740"
}

const BannerArea = () => {
    return (
        <div className="hero flex justify-center items-center py-[45px] md:py-[80px] px-[20px] lg:px-[0px] pb-[80px]">
            <div className="hero-wrapper flex flex-col-reverse md:flex-row md:max-w[90%] lg:max-w-[1140px] px-[16px]">
                <div className="content md:w-[60%] sm:px-[50px]">
                    <h2
                        className="title pt-[25px] w-[90%] lg:max-w-[90%] text-[2.25em] font-normal"
                        data-sal-delay="200"
                        data-sal="slide-up"
                        data-sal-duration="800"
                    >
                        {data.title}
                    </h2>
                    <p
                        className="description pb-[30px] lg:max-w-[70%]"
                        data-sal-delay="300"
                        data-sal="slide-up"
                        data-sal-duration="800"

                    >
                        {data.description}
                    </p>
                    <a 
                        href="" 
                        className="hero-btn mt-[20px] px-[34px] py-[15px] min-w-[160px] bg-[#00a3ff]"
                        data-sal-delay="400"
                        data-sal="slide-up"
                        data-sal-duration="800"
                    >
                        {data.button}
                    </a>
                </div>
                <div className="banner md:pl-[7%] lg:px-[3%] sm:px-[50px]">
                    <div className="image">
                        <img src={data.image} className="max-h-[80vh] w-full" alt="shaboy" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerArea;