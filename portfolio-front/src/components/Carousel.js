import {useState} from "react";

export default function Carousel({items}) {
    const [index, setIndex] = useState(0);

    function previousItem() {
        setIndex((index) => (index === 0 ? items.length - 1 : index - 1));
    }

    function nextItem() {
        setIndex((index) => (index === items.length - 1 ? 0 : index + 1));
    }


    return (
        <div className="carousel">
            <div className="carousel__items">
                {items[index]}
            </div>
            <div className="carousel__buttons">
                <button className="carousel__prev" onClick={previousItem}>Prev</button>
                <button className="carousel__next" onClick={nextItem}>Next</button>
            </div>
        </div>
    );
}