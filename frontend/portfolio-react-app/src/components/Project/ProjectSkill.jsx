import PropTypes from "prop-types";

export default function ProjectSkill({name}) {
    return <li>{name}</li>;
}

ProjectSkill.propTypes = {
    name: PropTypes.string.isRequired,
}