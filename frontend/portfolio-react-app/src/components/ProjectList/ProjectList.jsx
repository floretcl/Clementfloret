import PropTypes from "prop-types";
import '../../styles/ProjectList.scss'
import {useRef, useState} from "react";
import ProjectCard from "./ProjectCard.jsx";

export default function ProjectList({projects}) {
    const contentRef = useRef(null);
    const pointerStartX = useRef(0);
    const pointerEndX = useRef(0);
    const isSwiping = useRef(false);
    const [index, setIndex] = useState(1);

    function getClassName(i) {
        if (i === index) {
            return "project-card--index";
        } else if (i === getIndexPlus2() && projects.length >= 5) {
            return "project-card--indexPlus2";
        } else if (i === getIndexPlus1() && projects.length >= 3) {
            return "project-card--indexPlus1";
        } else if (i === getIndexMinus1() && projects.length >= 3) {
            return "project-card--indexMinus1";
        } else if (i === getIndexMinus2() && projects.length >= 5) {
            return "project-card--indexMinus2";
        } else {
            return "";
        }
    }

    function getIndexMinus2() {
        if (index - 2 > 0) {
            return (index - 2);
        } else {
            return (((index - 2) % projects.length) + projects.length);
        }
    }

    function getIndexMinus1() {
        if (index - 1 > 0) {
            return (index - 1);
        } else {
            return (((index - 1) % projects.length) + projects.length);
        }
    }

    function getIndexPlus1() {
        if (index + 1 > projects.length) {
            return ((index + 1) % projects.length);
        } else {
            return (index + 1);
        }
    }

    function getIndexPlus2() {
        if (index + 2 > projects.length) {
            return ((index + 2) % projects.length);
        } else {
            return (index + 2);
        }
    }

    function handlePointerDown(e) {
        pointerStartX.current = e.clientX;
    }

    function handlePointerUp() {
        const movementX = pointerEndX.current - pointerStartX.current;
        if (Math.abs(movementX) > 40 && window.innerWidth >= 640) {
            isSwiping.current = true;
            if (movementX < 0) {
                nextItem();
            } else {
                previousItem();
            }
        }
    }

    function handlePointerMove(e) {
        pointerEndX.current = e.clientX;
    }

    function handleClick(e) {
        if (isSwiping.current) {
            e.preventDefault();
        }
    }

    function previousItem() {
        setIndex((index) => (index === 1 ? projects.length : index - 1));
    }

    function nextItem() {
        setIndex((index) => (index === projects.length ? 1 : index + 1));
    }

    return (
        <>
            {projects ? (
                <>
                    <div className="projects-list__buttons-yaxis">
                        <button className="projects-list__button hoverable" onClick={previousItem}>
                            <svg width="512" height="512" viewBox="0 0 512 512" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M255.998 231.006L150.404 336.602L120.234 306.432L255.998 170.667L391.763 306.432L361.594 336.602L255.998 231.006Z"
                                    fill="currentColor"/>
                            </svg>
                        </button>
                        <button className="projects-list__button hoverable" onClick={nextItem}>
                            <svg width="512" height="512" viewBox="0 0 512 512" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M256 281.003L361.6 175.403L391.765 205.568L256 341.333L120.235 205.568L150.4 175.403L256 281.003Z"
                                    fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                    <div className="projects-list__buttons-xaxis">
                        <button className="projects-list__button hoverable" onClick={previousItem}>
                            <svg width="512" height="512" viewBox="0 0 512 512" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M231.006 256.015L336.602 361.608L306.432 391.778L170.667 256.015L306.432 120.25L336.602 150.42L231.006 256.015Z"
                                    fill="currentColor"/>
                            </svg>
                        </button>
                        <button className="projects-list__button hoverable" onClick={nextItem}>
                            <svg width="512" height="512" viewBox="0 0 512 512" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M280.996 256.015L175.401 150.42L205.571 120.25L341.335 256.015L205.571 391.778L175.401 361.608L280.996 256.015Z"
                                    fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                    <div ref={contentRef} className="projects-list__content">
                        <ol className="projects-list__list">
                            {projects.map((project, index) =>
                                <ProjectCard key={index + 1}
                                             project={project}
                                             className={getClassName(index + 1)}
                                             onDragStart={(e) => e.preventDefault()}
                                             onPointerDown={handlePointerDown}
                                             onPointerUp={handlePointerUp}
                                             onPointerMove={handlePointerMove}
                                             onClick={handleClick}/>
                            )}
                        </ol>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

ProjectList.propTypes = {
    projects: PropTypes.array.isRequired,
}