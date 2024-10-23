import PropTypes from "prop-types";

export default function MenuLink({name, url, toggleMenu}) {
    return (
        <li className="menu__link">
            <a href={url} onClick={toggleMenu} className="hoverable">
                {name}
            </a>
            <hr className="menu__divider"/>
        </li>
    );
}

MenuLink.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    toggleMenu: PropTypes.func.isRequired
}