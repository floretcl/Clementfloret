import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

export default function MenuLink({name, url, toggleMenu}) {
    return (
        <li className="menu__link">
            <NavLink onClick={toggleMenu} to={url} className="hoverable">
                {name}
                <hr className="menu__divider"/>
            </NavLink>
        </li>
    );
}

MenuLink.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    toggleMenu: PropTypes.func.isRequired
}