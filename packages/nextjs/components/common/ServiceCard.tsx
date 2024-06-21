"use client";

import { FunctionComponent } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type Props = {
    data: Card
}


type Card = {
    title: string,
    subtitle: string,
    icon: string, 
    description: string,
    target_url: string
}

const ServiceCard: FunctionComponent<Props> = ({ data }) => {
    return (
        <div className="service-card">
            <div className="service-card-wrapper">
                <div className="inner">
                    <div className="icon">
                        <img src={data.icon} alt="Shape" />
                    </div>
                    <div className="subtitle">{data.subtitle}</div>
                    <div className="content">
                        <h4 className="title">{data.title}</h4>
                        <p className="description">{data.description}</p>
                        <a href="readmore" className="">
                            <ArrowRightIcon />
                        </a>
                    </div>
                </div>
                <a href={data.target_url} className="over-link"></a>
            </div>
        </div>
    );
};

export default ServiceCard;
