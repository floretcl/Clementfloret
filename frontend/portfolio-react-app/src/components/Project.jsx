import Carousel from "./Carousel/Carousel.jsx";
import ProjectSkill from "./Project/ProjectSkill.jsx";
import ProjectLink from "./Project/ProjectLink.jsx";
import '../styles/Project.scss'
import {useEffect, useRef, useState} from "react";

export default function Project() {
    const [project, setProject] = useState([]);
    const [images, setImages] = useState([]);
    const [listSkills, setListSkills] = useState([]);
    const [listLinks, setListLinks] = useState([]);

    useEffect(() => {
        function getListLinks() {
            return project.links.map((link) =>
                <ProjectLink key={link.id} url={link.url} name={link.name} icon={link.icon}/>
            )
        }

        function getListSkills() {
            let list = project.skills.map((skill) =>
                <ProjectSkill key={skill[0]} name={skill[1]}/>
            )
            // add "-" between each ProjectSkill
            return list.reduce((accumulator, elements) => {
                return accumulator === null ? [elements] : [...accumulator, "-", elements];
            }, null);
        }

        function fetchRequest() {
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
                    setListSkills(getListSkills());
                    setListLinks(getListLinks());
                    setImages(project.images);
                })
                .catch(error => {
                    console.log(`Error getting project data: ${error}`);
                });
        }

        fetchRequest();
    }, [project]);

    return (
        <main className="project">
            <Carousel images={images}/>
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