import ProjectList from "./ProjectList/ProjectList.jsx";
import ProjectFilter from "./ProjectFilter/ProjectFilter.jsx";
import {useState} from "react";
import '../styles/Projects.scss'

export default function Projects() {
    const [projectFilter, setProjectFilter] = useState("");
    const filters = JSON.parse(document.getElementById("project-types").textContent);

    const listFilters = filters.map((filter) =>
        <ProjectFilter key={filter.id} name={filter.name} filterChange={() => setProjectFilter(filter.name)} />
    );

    return (
        <main className="projects">
            <h1 className="projects__title">Projects</h1>
            <ol className="projects__filters">
                <ProjectFilter name="All" filterChange={() => setProjectFilter("")} />
                {listFilters}
            </ol>
            <div className="projects__list">
                <ProjectList filter={projectFilter}/>
            </div>
        </main>
    );
}