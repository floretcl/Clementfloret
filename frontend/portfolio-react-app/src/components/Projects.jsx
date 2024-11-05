import ProjectList from "./ProjectList/ProjectList.jsx";
import ProjectFilter from "./ProjectList/ProjectFilter.jsx";
import {useEffect, useState} from "react";
import '../styles/Projects.scss'
import {useTranslation} from "react-i18next";

export default function Projects() {
    const {t} = useTranslation();
    const [projectFilter, setProjectFilter] = useState("");
    const [projectTypes, setProjectTypes] = useState(null);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        fetchProjectTypes();
        fetchProjects();
    }, []);

    function fetchProjectTypes() {
        const pathName = window.location.pathname;
        const langPrefix = pathName.startsWith('/fr/') ? '/fr' : pathName.startsWith('/en/') ? '/en' : '';
        const url = `${langPrefix}/api/project_types`;

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
                setProjectTypes(data);
            })
            .catch(error => {
                console.log(`Error getting project types data: ${error}`);
            });
    }

    function fetchProjects() {
        const pathName = window.location.pathname;
        const langPrefix = pathName.startsWith('/fr/') ? '/fr' : pathName.startsWith('/en/') ? '/en' : '';
        const url = `${langPrefix}/api/projects`;

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
                setProjects(data);
            })
            .catch(error => {
                console.log(`Error getting projects data: ${error}`);
            });
    }

    return (
        <main className="projects">
            <h1 className="projects__title">{t('projects_title')}</h1>
            <ol className="projects__filters">
                <ProjectFilter
                    key={0}
                    name={t('project_filter_all')}
                    filterChange={() => setProjectFilter("")}
                />
                {projectTypes && projectTypes.map((type) =>
                    <ProjectFilter
                        key={type.id}
                        name={type.name}
                        filterChange={() => setProjectFilter(type.name)}
                    />
                )}
            </ol>
            <div className="projects__list">
                {projects ? (
                    <ProjectList filter={projectFilter} projects={projects} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </main>
    );
}