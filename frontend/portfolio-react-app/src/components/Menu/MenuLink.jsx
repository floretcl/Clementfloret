import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

export default function MenuLink({name, url, toggleMenu}) {
    return (
        <li className="menu__link">
            <NavLink to={url} onClick={toggleMenu} className="hoverable">
                {name}
            </NavLink>
            <hr className="menu__divider"/>
        </li>
    );
}

MenuLink.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    toggleMenu: PropTypes.func.isRequired
}