import Carousel from "./Carousel/Carousel.jsx";

export default function Project() {
    const project = JSON.parse(document.getElementById("project").textContent);
    const skills = JSON.parse(document.getElementById("project-skills").textContent);
    const links = JSON.parse(document.getElementById("project-links").textContent);

    const listSkills = skills.map((skill, i, {length}) => {
        if(i + 1 === length) {
            return <li key={skill.id}>{skill.name}</li>;
        } else {
            return <><li key={skill.id}>{skill.name}</li> - </>;
        }
    });

    const listLinks = links.map((link, i, {length}) => {
        if(i + 1 === length) {
            return <li key={link.id}><a className="hoverable" href={link.url}>{link.name}</a></li>;
        } else {
            return <>
                <li key={link.id}><a className="hoverable" href={link.url}>{link.name}</a></li>
                - </>;
        }
    });

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