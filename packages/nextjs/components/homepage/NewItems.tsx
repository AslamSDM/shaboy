import ProductCard from "../common/ProductCard"
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {useState,useEffect} from "react"
import axios from "axios"
export default function NewGames() {
    const [metadata, setMetadata] = useState<any[]>([]);

    useEffect(() => {
        const get_active_listing = async () => {
            const newform = new FormData();
            newform.append("method", "get");
        
            const res = await axios.post(
              "/api/create/newlisting",
                newform
            );
            if (res.data) {
                console.log(res.data);
              setMetadata(res.data);
            } else console.log("ERROR");
          };
        get_active_listing();
      },[]);
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
                        metadata.map((product, i) => {
                            return (
                                <ProductCard key={i} product={product} style={'sm:w-[45%] lg:w-[25%] xl:w-[20%]'} animation={false} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}