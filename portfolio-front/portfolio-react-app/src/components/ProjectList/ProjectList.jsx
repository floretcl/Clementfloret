import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import {useRef} from "react";
import PropTypes from "prop-types";

export default function ProjectList({filter}) {
    const contentRef = useRef(null);
    const projects = JSON.parse(document.getElementById("project-list").textContent);

    const projectsFiltered = projectFiltration(projects)

    const listProjects = projectsFiltered.map(project =>
        <ProjectCard key={project.id} id={project.id} name={project.name} image={project.image} type={project.type} />
    );

    function projectFiltration(projects) {
        if (filter !== "") {
            return projects.filter(project => project.type === filter);
        } else {
            return projects;
        }
    }

    function handleBackButton() {
        contentRef.current.scrollLeft -= 100;
    }

    function handleNextButton() {
        contentRef.current.scrollLeft += 100;
    }


    return (
        <>
            <div className="projects-list__buttons">
                <button className="projects-list__button hoverable" onClick={handleBackButton}>&lsaquo;</button>
                <button className="projects-list__button hoverable" onClick={handleNextButton}>&rsaquo;</button>
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