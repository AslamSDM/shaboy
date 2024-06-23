import { FunctionComponent } from "react";

type Props = {
    product: any,
    style: string,
    animation: Boolean,
    handleClick?:()=> void
}

type Card = {
    image: string,
    url: string,
    name: string,
    price: string,
    likes: Number
}


const ProductCard: FunctionComponent<Props> = ({ product, style, animation ,handleClick}) => {

    return (
        <div onClick={handleClick}
            className={`product-card ${style}`}
            data-sal-delay={`${animation && "150"}`}
            data-sal={`${animation && "slide-up"}`}
            data-sal-duration={`${animation && "800"}`}
        >
            <div className="product-card-wrapper">
                <div className="card-thumbnail">
        

                    <a href="#">
                    {/* <a href={product.image}> */}
                    {
                        product?.image &&
                        <img className="product-image" src={(product.image).replace("ipfs://","https://ipfs.io/ipfs/")} alt="" />
                    }

                    </a>
                </div>
                <a className="product-details" href="">
                    <span className="product-name">{product.name}</span>
                </a>
                <div className="product-price-like">
                   {product.price && <div className="price">{product.price}</div>}
                    {/* <div className="like">
                        <svg viewBox="0 0 17 16" fill="none" width={16} height={16} className="sc-bdnxRM sc-hKFxyN kBvkOu">
                            <path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth={2} />
                        </svg>


                        <span>{product.likes.toString()}</span>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default ProductCard;
