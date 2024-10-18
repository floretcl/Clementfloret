import PropTypes from "prop-types";
import '../../styles/ProjectCard.scss'
import {useTranslation} from "react-i18next";

export default function ProjectCard({
                                        id,
                                        name,
                                        image,
                                        type,
                                        className,
                                        onDragStart,
                                        onPointerDown,
                                        onPointerUp,
                                        onPointerMove,
                                        onClick
                                    }) {
    const {i18n, t} = useTranslation();

    return (
        <li className={`project-card ${className}`}
            onDragStart={onDragStart}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}>
            <a
                className={`project-card__link hoverable ${className !== "project-card--index" ? "project-card__link--disable" : ""}`}
                onClick={onClick}
                href={`/${i18n.language}/project/${id}`}>
                <img className="project-card__img" src={image.url} alt={`${image.name} ${t('thumbnail')}`}/>
                <div className="project-card__text">
                    <p className="project-card__name">{name}</p>
                    <p className="project-card__type">{type}</p>
                </div>
            </a>
        </li>
    );
}

ProjectCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onPointerDown: PropTypes.func.isRequired,
    onPointerUp: PropTypes.func.isRequired,
    onPointerMove: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}