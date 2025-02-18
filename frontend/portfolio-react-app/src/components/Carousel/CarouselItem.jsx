import PropTypes from "prop-types";
import '../../styles/CarouselItem.scss'
import {useTranslation} from "react-i18next";

export default function CarouselItem({id, index, name, image}) {
    const {t} = useTranslation();

    return (
        <li
            className={`item 
            ${id === index ? "item--active" : ""} 
            ${id === index - 1 ? "item--prev" : ""} 
            ${id === index + 1 ? "item--next" : ""}`}>
            <div className="item__content">
                <a
                    href={image}
                    target="_blank"
                    aria-label={`${t('link_to')} ${name} screen`}
                    title={t('see_img')}>
                    <img className="item__img" src={image} alt={`${name} screen`} width="1920" height="1280"/>
                </a>
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