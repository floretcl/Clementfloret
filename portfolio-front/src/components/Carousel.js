import {useEffect, useState} from "react";
import Item from "./Item";
import imgSrc1 from "../img/ales-nesetril-Im7lZjxeLhg-unsplash.webp";
import imgSrc2 from "../img/campaign-creators-OGOWDVLbMSc-unsplash.webp";
import imgSrc3 from "../img/christopher-gower-m_HRfLhgABo-unsplash.webp";
import imgSrc4 from "../img/domenico-loia-EhTcC9sYXsw-unsplash.webp";

export default function Carousel() {
    const [index, setIndex] = useState(0);
    const [count, setCount] = useState(0);
    const [startCarousel, setStartCarousel] = useState(false);

    const items = [{
        id: 0,
        imgSrc: imgSrc1
    }, {
        id: 1,
        imgSrc: imgSrc2
    }, {
        id: 2,
        imgSrc: imgSrc3
    }, {
        id: 3,
        imgSrc: imgSrc4
    }];

    const listItems = items.map(item =>
        <Item key={item.id} id={item.id} index={index} imgSrc={item.imgSrc} />
    );
    const listDots = items.map(item =>
        <div key={item.id} className={`carousel__dot ${item.id === index ? "carousel__dot--active" : ""}`}></div>
    );

    function previousItem() {
        setIndex((index) => (index === 0 ? items.length - 1 : index - 1));
    }

    function nextItem() {
        setIndex((index) => (index === items.length - 1 ? 0 : index + 1));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevState => (prevState + 1) % items.length);
            setStartCarousel(true);
        }, 3000);

        if (startCarousel) {
            nextItem();
        }

        return () => {
            clearInterval(interval);
        }
    }, [count]);

    return (
        <div className="carousel">
            <ul className="carousel__items">
                {listItems}
            </ul>
            <div className="carousel__buttons">
                <button className="carousel__button hoverable" onClick={previousItem}>&lsaquo;</button>
                <button className="carousel__button hoverable" onClick={nextItem}>&rsaquo;</button>
            </div>
            <div className="carousel__dots">
                {listDots}
            </div>
        </div>
    );
}