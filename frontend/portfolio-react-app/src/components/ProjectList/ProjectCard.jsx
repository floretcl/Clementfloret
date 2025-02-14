import PropTypes from "prop-types";
import '../../styles/ProjectCard.scss'
import {useTranslation} from "react-i18next";
import {useRef} from "react";
import {useParams} from "react-router-dom";

export default function ProjectCard({
                                        project,
                                        className,
                                        onDragStart,
                                        onPointerDown,
                                        onPointerUp,
                                        onPointerMove,
                                        onClick
                                    }) {
    let params = useParams();
    const {t} = useTranslation();
    const lang = useRef(params.lang);

    return (
        <li className={`project-card ${className}`}
            onDragStart={onDragStart}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}>
            <a
                className={`project-card__link hoverable ${className !== "project-card--index" ? "project-card__link--disable" : ""}`}
                onClick={onClick}
                href={`${lang.current === "en" ? "/en" : ""}/project/${project.id}`}
                aria-label={`${t('link_to')} ${name} project`}>
                <img
                    className="project-card__img"
                    src={project.images[0].url}
                    width="1920"
                    height="1280"
                    alt={`${project.images[0].name} ${t('thumbnail')}`}/>
                <div className="project-card__text">
                    <p className="project-card__name">{project.name}</p>
                    <p className="project-card__type">
                        {project.types.map((type) =>
                            <>{type.name}</>
                        ).reduce((prevElements, element) => {
                            return prevElements === null ? [element] : [...prevElements, " - ", element];
                        }, null)}</p>
                </div>
            </a>
        </li>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onPointerDown: PropTypes.func.isRequired,
    onPointerUp: PropTypes.func.isRequired,
    onPointerMove: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}