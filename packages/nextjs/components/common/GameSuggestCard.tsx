import { FunctionComponent } from "react";

type Props = {
    product: Card,
    style: string,
}

type Card = {
    image: string,
    url: string,
    name: string
}

const GameSuggestCard: FunctionComponent<Props> = ({ product, style }) => {
    return (
        <div>
            <div className="flex flex-col w-[300px] bg-[#ffffff0a] p-[10px] max-w-[85%] rounded-[15px]">
                <div className="">
                    <a href={product.url}>
                        <img className="rounded-[10px]" src={product.image} alt="" />
                    </a>
                </div>
                <a className="pt-[10px] pl-[5px]" href={product.url}>
                    <span className="text-[1.2em]">{product.name}</span>
                </a>
            </div>
        </div>
    );
};

export default GameSuggestCard;
