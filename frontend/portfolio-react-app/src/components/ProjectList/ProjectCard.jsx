import PropTypes from "prop-types";
import '../../styles/ProjectCard.scss'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

export default function ProjectCard({length, index, id, name, image, type}) {
    const {i18n, t } = useTranslation();
    const [indexMinus2, setIndexMinus2] = useState(0);
    const [indexMinus1, setIndexMinus1] = useState(0);
    const [indexPlus1, setIndexPlus1] = useState(0);
    const [indexPlus2, setIndexPlus2] = useState(0);

    useEffect(() => {
        const getIndexMinus2 = () => {
            if (index - 2 > 0) {
                setIndexMinus2(index - 2);
            } else {
                setIndexMinus2(((index - 2) % length) + length);
            }
        }

        const getIndexMinus1 = () => {
            if (index - 1 > 0) {
                setIndexMinus1(index - 1);
            } else {
                setIndexMinus1(((index - 1) % length) + length);
            }
        }

        const getIndexPlus1 = () => {
            if (index + 1 > length) {
                setIndexPlus1((index + 1) % length);
            } else {
                setIndexPlus1(index + 1);
            }
        }

        const getIndexPlus2 = () => {
            if (index + 2 > length) {
                setIndexPlus2((index + 2) % length);
            } else {
                setIndexPlus2(index + 2);
            }
        }

        getIndexMinus2();
        getIndexMinus1();
        getIndexPlus1();
        getIndexPlus2();
    }, [index, length]);

    return (
        <li className={`project-card
            ${id === indexMinus2 ? "project-card--indexMinus2" : ""}
            ${id === indexMinus1 ? "project-card--indexMinus1" : ""} 
            ${id === index ? "project-card--index" : ""} 
            ${id === indexPlus1 ? "project-card--indexPlus1" : ""}
            ${id === indexPlus2 ? "project-card--indexPlus2" : ""}`}>
            <a className="project-card__link hoverable" href={`/${i18n.language}/project/${id}`}>
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