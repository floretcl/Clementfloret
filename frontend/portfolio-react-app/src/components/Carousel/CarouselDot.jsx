import PropTypes from "prop-types";

export default function CarouselDot({id, index}) {
    return (
        <div className={`carousel__dot ${id === index ? "carousel__dot--active" : ""}`}></div>
    );
}

CarouselDot.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
}