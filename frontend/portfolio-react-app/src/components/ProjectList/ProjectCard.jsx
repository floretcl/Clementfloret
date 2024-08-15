import PropTypes from "prop-types";
import '../../styles/ProjectCard.scss'
import {useTranslation} from "react-i18next";

export default function ProjectCard({id, name, image, type}) {
    const { t } = useTranslation();

    return (
        <li>
            <a className="project-card hoverable" href={`/project/${id}`}>
                <div className="project-card__thumbnail">
                    <img className="project-card__img" src={image.url} alt={`${image.name} ${t('thumbnail')}`}/>
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