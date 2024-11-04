import Carousel from "./Carousel/Carousel.jsx";
import ProjectSkill from "./Project/ProjectSkill.jsx";
import ProjectLink from "./Project/ProjectLink.jsx";
import '../styles/Project.scss'
import {useEffect, useState} from "react";

export default function Project() {
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetchProject();
    }, []);

    function fetchProject() {
        const pathName = window.location.pathname;
        const pathNameSplit = pathName.split('/');
        const id = pathNameSplit[pathNameSplit.length - 1];
        const langPrefix = pathName.startsWith('/fr/') ? '/fr' : pathName.startsWith('/en/') ? '/en' : '';
        const url = `${langPrefix}/api/project?id=${id}`;

        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'same-origin',
            cache: 'default',
        };

        fetch(url, init)
            .then(response => response.json())
            .then(data => {
                setProject(data);
            })
            .catch(error => {
                console.log(`Error getting project data: ${error}`);
            });
    }

    return (
        <main className="project">
            {project ? (
                <>
                    <Carousel images={project.images}/>
                    <div className="project__content">
                        <h1 className="project__title">{project.name}</h1>
                        <p className="project__text">
                            {project.description}
                        </p>
                        <ol className="project__skills">
                            {project.skills.map((skill) =>
                                <ProjectSkill key={skill[0]} name={skill[1]}/>
                            ).reduce((prevComponents, component) => {
                                return prevComponents === null ? [component] : [...prevComponents, "-", component];
                            }, null)}
                        </ol>
                        <ol className="project__links">
                            {project.links.map((link) =>
                                <ProjectLink key={link.id} url={link.url} name={link.name} icon={link.icon}/>
                            )}
                        </ol>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}