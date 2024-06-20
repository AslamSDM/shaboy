import { useState } from "react";
import ProductCard from "../homepage/ProductCard";

type Imagearray = {
    image: string,
    url: string,
    name: string,
    price: string,
    likes: Number
}

const owned = [
    {
        image: "https://static.javatpoint.com/top10-technologies/images/top-10-games-in-the-world1.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://scopely-website.s3.eu-west-2.amazonaws.com/_resized/qobt2OWZZCY7DrqtE5EyGuAbfMVrGYmTK2CeUJJM-w700-q75.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://static.javatpoint.com/top10-technologies/images/top-10-games-in-the-world1.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://static.javatpoint.com/top10-technologies/images/top-10-games-in-the-world1.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
    {
        image: "https://scopely-website.s3.eu-west-2.amazonaws.com/_resized/qobt2OWZZCY7DrqtE5EyGuAbfMVrGYmTK2CeUJJM-w700-q75.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    },
]

const ownsale = [
    {
        image: "https://i.guim.co.uk/img/media/7c2ab1a3e60e445caf0a4d3de302591e830e8f7f/0_0_3800_2280/master/3800.jpg?width=480&dpr=1&s=none",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    }
]

const created = [
    {
        image: "https://static.javatpoint.com/top10-technologies/images/top-10-games-in-the-world1.png",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    }
]

const ProfilePage = () => {
    const [tab, setTab] = useState<Number>(1);
    const [list, setList] = useState<Imagearray[]>(owned);

    const handleClick = (t:Number) => {
        setTab(t);
        if(t == 1) setList(owned);
        if(t == 2) setList(ownsale);
        if(t == 3) setList(created);
    }

    return (
        <div className="">
            <div className="banner-image w-full h-[200px] bg-no-repeat bg-cover bg-center bg-[url('https://www.rainbowit.net/html/nuron/assets/images/bg/bg-image-9.jpg')]"></div>
            <div className="flex justify-center">
                <div className="flex flex-col items-center mt-[-80px]">
                    <img src="https://www.rainbowit.net/html/nuron/assets/images/slider/banner-06.png" alt="Profile" className="border-[15px] border-solid border-[#13131d] rounded-md" />
                    <h4 className="fold-extrabold m-[20px] text-[26px]">
                        ABDUL AZEEZ V
                    </h4>
                </div>
            </div>
            <div className="w-full flex justify-center pt-[30px]">
                <div className="flex flex-wrap border bg-[#10101657] border-[#ffffff14] rounded-[6px]">
                    <button className={`text-white rounded-[5px] m-[2px] w-[150px] h-[50px] transition ${tab == 1 && 'bg-[#202020]'}`} onClick={() => { handleClick(1) }}>Owned</button>
                    <button className={`text-white rounded-[5px] m-[2px] w-[150px] h-[50px] transition ${tab == 2 && 'bg-[#202020]'}`} onClick={() => { handleClick(2) }}>Ownsale</button>
                    <button className={`text-white rounded-[5px] m-[2px] w-[150px] h-[50px] transition ${tab == 3 && 'bg-[#202020]'}`} onClick={() => { handleClick(3) }}>Created</button>
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-full flex flex-col sm:flex-row py-[30px] md:py-[60px] gap-[2.25rem] px-[30px] sm:px-[60px] sm:flex-wrap">
                    {
                        list.map((product, i) => {
                            return (
                                <ProductCard key={i} product={product} style={'sm:w-[45%] lg:w-[25%] xl:w-[20%]'} animation={false}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;