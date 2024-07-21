import PropTypes from "prop-types";

export default function ProjectCard({name, imgSrc, type, url}) {
    return (
        <li>
            <a className="project-card hoverable" href={url}>
                <div className="project-card__thumbnail">
                    <img className="project-card__img" src={imgSrc} alt={name + " thumbnail"}/>
                </div>
                <div className="project-card__text">
                    <p className="project-card__name">{name}</p>
                    <p className="project-card__type">{type}</p>
                </div>
            </a>
        </li>
    );
}

ProjectCard.propTypes = {
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}