import {useState} from "react";
import CarouselItem from "./CarouselItem.jsx";
import '../../styles/Carousel.scss'
import CarouselDot from "./CarouselDot.jsx";
import PropTypes from "prop-types";

export default function Carousel({images}) {
    const [index, setIndex] = useState(0);

    const listItems = images.map((item, i) =>
        <CarouselItem key={i} id={i} index={index} name={item.name} image={item.image} />
    );
    const listDots = images.map((item, i) =>
        <CarouselDot key={i} id={i} index={index} />
    );

    function previousItem() {
        setIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    }

    function nextItem() {
        setIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    }

    return (
        <div className="carousel">
            <ol className="carousel__items">
                {listItems}
            </ol>
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

Carousel.propTypes = {
    images: PropTypes.array.isRequired
}