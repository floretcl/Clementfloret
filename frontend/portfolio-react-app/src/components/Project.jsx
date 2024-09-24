import Carousel from "./Carousel/Carousel.jsx";
import ProjectSkill from "./Project/ProjectSkill.jsx";
import ProjectLink from "./Project/ProjectLink.jsx";
import '../styles/Project.scss'

export default function Project() {
    const project = JSON.parse(document.getElementById("project").textContent);
    const links = JSON.parse(document.getElementById("project-links").textContent);

    const listLinks = links.map((link) =>
        <ProjectLink key={link.id} url={link.url} name={link.name} icon={link.icon}/>
    );

    let listSkills = project.skills.map((skill) => {
        return <ProjectSkill key={skill[0]} name={skill[1]}/>;
    });

    // add "-" between each ProjectSkill
    listSkills = listSkills.reduce((accumulator, elements) => {
        return accumulator === null ? [elements] : [...accumulator, "-", elements]
    }, null);

    return (
        <main className="project">
            <Carousel/>
            <div className="project__content">
                <h1 className="project__title">{project.name}</h1>
                <p className="project__text">
                    {project.description}
                </p>
                <ol className="project__skills">
                    {listSkills}
                </ol>
                <ol className="project__links">
                    {listLinks}
                </ol>
            </div>
        </main>
    );
}