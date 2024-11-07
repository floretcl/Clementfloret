import ProjectList from "./ProjectList/ProjectList.jsx";
import ProjectFilter from "./ProjectList/ProjectFilter.jsx";
import {useEffect, useRef, useState} from "react";
import '../styles/Projects.scss'
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

export default function Projects() {
    let params = useParams();
    const { t } = useTranslation();
    const lang = useRef(params.lang);
    const [projectTypes, setProjectTypes] = useState(null);
    const [projects, setProjects] = useState(null);
    const [filter, setFilter] = useState(params.type);

    useEffect(() => {
        fetchProjectTypes();
        fetchProjects(filter);
    }, [filter]);

    function fetchProjectTypes() {
        const url = `/${lang.current}/api/project_types`;

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

    function fetchProjects(filter) {
        let url = `/${lang.current}/api/projects`;
        if (filter !== 0 && filter !== undefined) {
            url += `?type=${filter}`;
        }

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
                    url={`/${lang.current}/projects/`}
                    setFilter={()=> setFilter(0)}
                />
                {projectTypes && projectTypes.map((type) =>
                    <ProjectFilter
                        key={type.id}
                        name={type.name}
                        url={`/${lang.current}/projects/${type.id}`}
                        setFilter={() => setFilter(type.id)}
                    />
                )}
            </ol>
            <div className="projects__list">
                {projects ? (
                    <ProjectList projects={projects} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </main>
    );
}
