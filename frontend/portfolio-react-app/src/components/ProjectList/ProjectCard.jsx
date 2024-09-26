import PropTypes from "prop-types";
import '../../styles/ProjectCard.scss'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

export default function ProjectCard({length, index, id, name, image, type}) {
    const {i18n, t } = useTranslation();
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(0);

    useEffect(() => {
        const setPreviousItem = () => {
            if (index !== 1) {
                setPrev(index - 1);
            } else {
                setPrev(length);
            }
        }

        const setNextItem = () => {
            if (index !== length) {
                setNext(index + 1);
            } else {
                setNext(1);
            }
        }

        setPreviousItem();
        setNextItem();

    }, [index, length]);

    return (
        <li className={`project-card-carrousel
            ${id === prev? "project-card-carrousel--prev" : ""} 
            ${id === index ? "project-card-carrousel--active" : ""} 
            ${id === next ? "project-card-carrousel--next" : ""}`}>
            <a className="project-card hoverable" href={`/${i18n.language}/project/${id}`}>
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
    length: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}