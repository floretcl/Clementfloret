import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import {useRef} from "react";

export default function ProjectList() {
    const contentRef = useRef(null);

    const projects = JSON.parse(document.getElementById("projects").textContent);

    const listProjects = projects.map(project =>
        <ProjectCard key={project.id} name={project.name} imgSrc={project.imgSrc} type={project.type} url={project.url} />
    );

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