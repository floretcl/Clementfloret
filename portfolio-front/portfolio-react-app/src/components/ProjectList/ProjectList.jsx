import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import project1Img from "../../assets/img/ales-nesetril-Im7lZjxeLhg-unsplash.webp";
import project2Img from "../../assets/img/campaign-creators-OGOWDVLbMSc-unsplash.webp";
import project3Img from "../../assets/img/christopher-gower-m_HRfLhgABo-unsplash.webp";
import project4Img from "../../assets/img/domenico-loia-EhTcC9sYXsw-unsplash.webp";
import project5Img from "../../assets/img/rodion-kutsaiev-0VGG7cqTwCo-unsplash.webp";
import project6Img from "../../assets/img/taras-shypka-iFSvn82XfGo-unsplash.webp";
import {useRef} from "react";

export default function ProjectList() {
    const contentRef = useRef(null);

    const projects = [{
        id: 0,
        name: "Alpha",
        imgSrc: project1Img,
        type: "Web",
        url: "#"
    }, {
        id: 1,
        name: "Beta",
        imgSrc: project2Img,
        type: "Mobile",
        url: "#"
    }, {
        id: 2,
        name: "Gamma",
        imgSrc: project3Img,
        type: "Mobile",
        url: "#"
    }, {
        id: 3,
        name: "Delta",
        imgSrc: project4Img,
        type: "Web",
        url: "#"
    }, {
        id: 4,
        name: "Epsilon",
        imgSrc: project5Img,
        type: "Mobile",
        url: "#"
    }, {
        id: 5,
        name: "Zeta",
        imgSrc: project6Img,
        type: "Web",
        url: "#"
    }]

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