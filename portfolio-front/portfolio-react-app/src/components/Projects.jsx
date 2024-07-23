import ProjectList from "./ProjectList/ProjectList.jsx";
import ProjectFilter from "./ProjectFilter/ProjectFilter.jsx";

export default function Projects() {
    const filters = JSON.parse(document.getElementById("project-types").textContent);

    const listFilters = filters.map((filter) =>
        <ProjectFilter key={filter.id} name={filter.name} />
    );

    return (
        <main className="projects">
            <h1 className="projects__title">Projects</h1>
            <ol className="projects__filters">
                {listFilters}
            </ol>
            <div className="projects__list">
                <ProjectList/>
            </div>
        </main>
    );
}