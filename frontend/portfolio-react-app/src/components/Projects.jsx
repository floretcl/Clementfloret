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
    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        fetchProjectTypes();
        fetchProjects(filter);
    }, [filter]);

    function fetchProjectTypes() {
        const url = `${lang.current === "fr" ? "" : "/en"}/api/project_types`;

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
        let url = `${lang.current === "fr" ? "" : "/en"}/api/projects`;
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

    function modifyFilter(filter) {
        setFilter(filter);
        setCurrentIndex(1);
    }

    function previousProject() {
        setCurrentIndex((index) => (index === 1 ? projects.length : index - 1));
    }

    function nextProject() {
        setCurrentIndex((index) => (index === projects.length ? 1 : index + 1));
    }

    return (
        <main className="projects">
            <h1 className="projects__title">{t('projects_title')}</h1>
            <ol className="projects__filters">
                <ProjectFilter
                    key={0}
                    name={t('project_filter_all')}
                    url={`${lang.current === "fr" ? "" : "/en"}/projects/`}
                    setFilter={()=> modifyFilter(0)}
                />
                {projectTypes && projectTypes.map((type) =>
                    <ProjectFilter
                        key={type.id}
                        name={type.name}
                        url={`${lang.current === "fr" ? "" : "/en"}/projects/${type.id}`}
                        setFilter={() => modifyFilter(type.id)}
                    />
                )}
            </ol>
            <div className="projects__list">
                {projects ? (
                    <ProjectList
                        projects={projects}
                        currentIndex={currentIndex}
                        onClickPrevious={previousProject}
                        onClickNext={nextProject} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </main>
    );
}
