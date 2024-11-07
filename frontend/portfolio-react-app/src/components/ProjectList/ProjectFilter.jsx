import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

export default function ProjectFilter({name, url, setFilter}) {
    return (
        <li>
            <NavLink to={url} onClick={setFilter} className="projects__filter-link hoverable">
                {name}
            </NavLink>
        </li>
    );
}

ProjectFilter.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}