import PropTypes from "prop-types";
import '../../styles/CarouselItem.scss'

export default function CarouselItem({id, index, name, image}) {
    return (
        <li
            className={`item 
            ${id === index ? "item--active" : ""} 
            ${id === index - 1 ? "item--prev" : ""} 
            ${id === index + 1 ? "item--next" : ""}`}>
            <div className="item__content">
                <img className="item__img" src={image} alt={`${name} screen`} width="1920" height="1280"/>
            </div>
        </li>
    );
}

CarouselItem.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}