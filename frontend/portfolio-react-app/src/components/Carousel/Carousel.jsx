import {useState} from "react";
import CarouselItem from "./CarouselItem.jsx";
import '../../styles/Carousel.scss'
import CarouselDot from "./CarouselDot.jsx";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export default function Carousel({images}) {
    const {t} = useTranslation();
    const [index, setIndex] = useState(0);

    function previousItem() {
        setIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    }

    function nextItem() {
        setIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    }

    return (
        <div className="carousel">
            <div className="carousel__buttons">
                <button className="carousel__button hoverable" onClick={previousItem} title={t('previous_button')}>&lsaquo;</button>
                <button className="carousel__button hoverable" onClick={nextItem} title={t('next_button')}>&rsaquo;</button>
            </div>
            <ol className="carousel__items">
                {images && images.map((item, id) =>
                    <CarouselItem key={id} id={id} index={index} name={item.name} image={item.image} />
                )}
            </ol>
            <div className="carousel__dots">
                {images && images.map((item, id) =>
                    <CarouselDot key={id} id={id} index={index} />
                )}
            </div>
        </div>
    );
}

Carousel.propTypes = {
    images: PropTypes.array.isRequired
}