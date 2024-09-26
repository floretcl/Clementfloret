import ProjectCard from "./ProjectCard.jsx";
import {useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import '../../styles/ProjectList.scss'

export default function ProjectList({filter}) {
    const contentRef = useRef(null);
    const [index, setIndex] = useState(1);
    const [count, setCount] = useState(0);

    const projects = JSON.parse(document.getElementById("projects").textContent);

    const items = useMemo(() => {
        return projects;
    }, [projects]);

    const itemsLength = useMemo(() => {
        return projects.length;
    }, [projects]);

    const projectsFiltered = projectFiltration(projects)

    const listProjects = projectsFiltered.map(project =>
        <ProjectCard length={itemsLength} index={index} key={project.id} id={project.id} name={project.name} image={project.images[0]} type={project.type} />
    );

    function projectFiltration(projects) {
        if (filter !== "") {
            return projects.filter(project => project.type === filter);
        } else {
            return projects;
        }
    }

    function previousItem() {
        setIndex((index) => (index === 1 ? items.length : index - 1));
    }

    function nextItem() {
        setIndex((index) => (index === items.length ? 1 : index + 1));
    }

    /*
    function handleBackButton() {
        contentRef.current.scrollLeft -= 100;
    }

    function handleNextButton() {
        contentRef.current.scrollLeft += 100;
    }
     */

    useEffect(() => {
        let startCarousel = false;
        const interval = setInterval(() => {
            setCount(prevState => (prevState + 1) % itemsLength);
            startCarousel = true;
        }, 3000);

        if (startCarousel) {
            setIndex((index) => (index === itemsLength ? 1 : index + 1));
        }

        return () => {
            clearInterval(interval);
        }
    }, [count, itemsLength]);


    return (
        <>
            <div className="projects-list__buttons">
                <button className="projects-list__button hoverable" onClick={previousItem}>
                    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M255.998 231.006L150.404 336.602L120.234 306.432L255.998 170.667L391.763 306.432L361.594 336.602L255.998 231.006Z"
                            fill="currentColor"/>
                    </svg>

                </button>
                <button className="projects-list__button hoverable" onClick={nextItem}>
                    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M256 281.003L361.6 175.403L391.765 205.568L256 341.333L120.235 205.568L150.4 175.403L256 281.003Z"
                            fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div ref={contentRef} className="projects-list__content">
                <ol className="projects-list__list">
                    {listProjects}
                </ol>
            </div>
        </>
    );
}

ProjectList.propTypes = {
    filter: PropTypes.string.isRequired
}