import ProjectCard from "./ProjectCard";
import project1Img from "../img/ales-nesetril-Im7lZjxeLhg-unsplash.webp";
import project2Img from "../img/campaign-creators-OGOWDVLbMSc-unsplash.webp";
import project3Img from "../img/christopher-gower-m_HRfLhgABo-unsplash.webp";
import project4Img from "../img/domenico-loia-EhTcC9sYXsw-unsplash.webp";
import project5Img from "../img/rodion-kutsaiev-0VGG7cqTwCo-unsplash.webp";
import project6Img from "../img/taras-shypka-iFSvn82XfGo-unsplash.webp";
import {useRef} from "react";

export default function ProjectList() {
    const contentRef = useRef(null);

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
                <ul className="projects-list__list">
                    <li>
                        <ProjectCard name="Alpha" imgSrc={project1Img} type="Web"/>
                    </li>
                    <li>
                        <ProjectCard name="Beta" imgSrc={project2Img} type="Web"/>
                    </li>
                    <li>
                        <ProjectCard name="Gamma" imgSrc={project3Img} type="Mobile"/>
                    </li>
                    <li>
                        <ProjectCard name="Delta" imgSrc={project4Img} type="Web"/>
                    </li>
                    <li>
                        <ProjectCard name="Epsilon" imgSrc={project5Img} type="Mobile"/>
                    </li>
                    <li>
                        <ProjectCard name="Zeta" imgSrc={project6Img} type="Web"/>
                    </li>
                </ul>
            </div>
        </>
    );
}