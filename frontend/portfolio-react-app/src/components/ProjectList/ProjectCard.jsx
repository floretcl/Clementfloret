import PropTypes from "prop-types";
import '../../styles/ProjectCard.scss'

export default function ProjectCard({id, name, image, type}) {
    return (
        <li>
            <a className="project-card hoverable" href={`/project/${id}`}>
                <div className="project-card__thumbnail">
                    <img className="project-card__img" src={image.url} alt={image.name + " thumbnail"}/>
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}