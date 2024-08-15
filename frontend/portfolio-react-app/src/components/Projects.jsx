import ProjectList from "./ProjectList/ProjectList.jsx";
import ProjectFilter from "./ProjectList/ProjectFilter.jsx";
import {useState} from "react";
import '../styles/Projects.scss'
import {useTranslation} from "react-i18next";

export default function Projects() {
    const {t} = useTranslation();
    const [projectFilter, setProjectFilter] = useState("");
    const filters = JSON.parse(document.getElementById("project-types").textContent);

    const listFilters = filters.map((filter) =>
        <ProjectFilter key={filter.id} name={filter.name} filterChange={() => setProjectFilter(filter.name)} />
    );

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