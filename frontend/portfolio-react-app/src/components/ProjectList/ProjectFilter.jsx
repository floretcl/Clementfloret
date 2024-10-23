import PropTypes from "prop-types";

export default function ProjectFilter({filterChange, name}) {
    return (
        <li>
            <button
                onClick={filterChange}
                type="button"
                className="projects__filter-btn hoverable">{name}
            </button>
        </li>
    );
}

ProjectFilter.propTypes = {
    filterChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}