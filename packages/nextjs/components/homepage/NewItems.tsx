import ProductCard from "../common/ProductCard"
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const products = [
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
    {
        image: "https://i.guim.co.uk/img/media/7c2ab1a3e60e445caf0a4d3de302591e830e8f7f/0_0_3800_2280/master/3800.jpg?width=480&dpr=1&s=none",
        url: "#",
        name: "Preatent",
        price: "0.244 WETH",
        likes: 82
    }
]

export default function NewGames() {
    return (
        <div className="w-full px-[20px]">
            <div className="px-[16px] sm:justify-center">
                {/* Head */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:px-[60px]">
                    <div>
                        <h3
                            className="font-bold mb-[0px] text-[1.7em] md:text-[2.5em]"
                            data-sal-delay="150"
                            data-sal="slide-up"
                            data-sal-duration="800"
                        >
                            Newest Games
                        </h3>
                    </div>
                    <div className="text-[#acacac] pt-[10px]">
                        <a href="" className="flex flex-row items-center hover:text-[#fff]">
                            VIEW ALL
                            <ArrowRightIcon className="w-[15px] h-[15px] ml-[5px]" />
                        </a>
                    </div>
                </div>

                <div
                    className="flex flex-col sm:flex-row py-[30px] md:py-[60px] gap-[2.25rem] px-[30px] sm:px-[60px] sm:flex-wrap"
                >
                    {
                        products.map((product, i) => {
                            return (
                                <ProductCard key={i} product={product} style={'sm:w-[45%] lg:w-[25%] xl:w-[20%]'} animation={true} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}