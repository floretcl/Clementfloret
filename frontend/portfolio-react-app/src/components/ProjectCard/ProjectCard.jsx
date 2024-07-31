import PropTypes from "prop-types";
import '../../styles/ProjectCard.scss'

export default function ProjectCard({id, name, image, type}) {
    return (
        <li>
            <a className="project-card hoverable" href={`/project/${id}`}>
                <div className="project-card__thumbnail">
                    <img className="project-card__img" src={image} alt={name + " thumbnail"}/>
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}