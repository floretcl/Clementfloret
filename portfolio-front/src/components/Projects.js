import ProjectCard from "./ProjectCard";
import project1Img from "../img/ales-nesetril-Im7lZjxeLhg-unsplash.webp";
import project2Img from "../img/campaign-creators-OGOWDVLbMSc-unsplash.webp";
import project3Img from "../img/christopher-gower-m_HRfLhgABo-unsplash.webp";
import project4Img from "../img/domenico-loia-EhTcC9sYXsw-unsplash.webp";
import project5Img from "../img/rodion-kutsaiev-0VGG7cqTwCo-unsplash.webp";
import project6Img from "../img/taras-shypka-iFSvn82XfGo-unsplash.webp";

export default function Projects() {
    return (
        <main className="projects">
            <h1 className="projects__title">Projects</h1>
            <ul className="projects__filters">
                <li>
                    <button type="button" onClick="" className="projects__filter-btn">All</button>
                </li>
                <li>
                    <button type="button" onClick="" className="projects__filter-btn">Web</button>
                </li>
                <li>
                    <button type="button" onClick="" className="projects__filter-btn">Mobile</button>
                </li>
            </ul>
            <div className="projects__content">
                <ul className="projects__list">
                    <li>
                        <ProjectCard name="Alpha" imgSrc={project1Img}/>
                    </li>
                    <li>
                        <ProjectCard name="Beta" imgSrc={project2Img}/>
                    </li>
                    <li>
                        <ProjectCard name="Gamma" imgSrc={project3Img}/>
                    </li>
                    <li>
                        <ProjectCard name="Delta" imgSrc={project4Img}/>
                    </li>
                    <li>
                        <ProjectCard name="Epsilon" imgSrc={project5Img}/>
                    </li>
                    <li>
                        <ProjectCard name="Zeta" imgSrc={project6Img}/>
                    </li>
                </ul>
            </div>
        </main>
    );
}