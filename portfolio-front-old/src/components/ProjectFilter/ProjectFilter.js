export default function ProjectFilter({name}) {
    return (
        <li>
            <button type="button" className="projects__filter-btn hoverable">{name}</button>
        </li>
    );
}