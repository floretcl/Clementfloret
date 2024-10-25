import ProjectList from "./ProjectList/ProjectList.jsx";
import ProjectFilter from "./ProjectList/ProjectFilter.jsx";
import {useEffect, useState} from "react";
import '../styles/Projects.scss'
import {useTranslation} from "react-i18next";

export default function Projects() {
    const {t} = useTranslation();
    const [projectFilter, setProjectFilter] = useState("");
    const [projectTypes, setProjectTypes] = useState([]);
    const listFilters = projectTypes.map((type) =>
        <ProjectFilter key={type.id} name={type.name} filterChange={() => setProjectFilter(type.name)} />
    );

    useEffect(() => {
        function fetchRequest() {
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
        fetchRequest();
    }, [projectTypes]);

    return (
        <main className="projects">
            <h1 className="projects__title">{t('projects_title')}</h1>
            <ol className="projects__filters">
                <ProjectFilter key={0} name={t('project_filter_all')} filterChange={() => setProjectFilter("")} />
                {listFilters}
            </ol>
            <div className="projects__list">
                <ProjectList filter={projectFilter}/>
            </div>
        </main>
    );
}