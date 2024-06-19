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
            <ul className="projects__filter">
                <li>All</li>
                <li>Web</li>
                <li>Mobile</li>
            </ul>
            <div className="projects__grid">
                <ul>
                    <li>
                        <ProjectCard name="Alpha" src={project1Img} />
                    </li>
                    <li>
                        <ProjectCard name="Alpha" imgSrc={project2Img} />
                    </li>
                    <li>
                        <ProjectCard name="Alpha" imgSrc={project3Img} />
                    </li>
                    <li>
                        <ProjectCard name="Alpha" imgSrc={project4Img} />
                    </li>
                    <li>
                        <ProjectCard name="Alpha" imgSrc={project5Img} />
                    </li>
                    <li>
                        <ProjectCard name="Alpha" imgSrc={project6Img} />
                    </li>
                </ul>
            </div>
        </main>
    );
}