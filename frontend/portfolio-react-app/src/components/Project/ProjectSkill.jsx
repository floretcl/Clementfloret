import PropTypes from "prop-types";

export default function ProjectSkill({name, last}) {
    if (last) {
        return <li>{name}</li>;
    } else {
        return <><li>{name}</li> - </>;
    }
}

ProjectSkill.propTypes = {
    name: PropTypes.string.isRequired,
    last: PropTypes.bool.isRequired
}