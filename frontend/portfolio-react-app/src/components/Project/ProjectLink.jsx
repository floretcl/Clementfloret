import PropTypes from "prop-types";

export default function ProjectLink({url, name, icon}) {
    return (
        <li>
            <a className="project__link hoverable" href={url} target="_blank" title={`link to ${name}`}>
                <img className="project__icon" src={icon} alt={`${name} icon`}/>
                {name}
            </a>
        </li>
    );
}

ProjectLink.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}