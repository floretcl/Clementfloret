import ProjectList from "./ProjectList/ProjectList.jsx";
import ProjectFilter from "./ProjectFilter/ProjectFilter.jsx";

export default function Projects() {
    const filters = [{
        id: 0,
        name: "All"
    },{
        id: 1,
        name: "Web"
    },{
        id: 2,
        name: "Mobile"
    }];

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