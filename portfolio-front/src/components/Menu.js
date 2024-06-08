import {useState} from "react";
import Mode from "./Mode";

export default function Menu() {
    const [isClosed, setIsClosed] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        if (isActive === true) {
            setIsClosed(true);
            setIsOpen(false);
            setTimeout(() => {
                setIsActive(false);
            }, 500);
        } else {
            setIsClosed(false);
            setIsOpen(true);
            setIsActive(true);
        }
    }

    // TODO : href
    return (
        <nav className={`header__nav`}>
            <div className={`menu ${isActive ? "menu--active" : ""} ${isOpen ? "menu--open" : "menu--close"}`}>
                <ul className="menu__list">
                    <li className="menu__link">
                        <a href="#">Home</a>
                        <hr className="menu__divider"/>
                    </li>
                    <li className="menu__link">
                        <a href="#">About</a>
                        <hr className="menu__divider"/>
                    </li>
                    <li className="menu__link">
                        <a href="#">Projects</a>
                        <hr className="menu__divider"/>
                    </li>
                    <li className="menu__link">
                        <a href="#">Contact</a>
                        <hr className="menu__divider"/>
                    </li>
                </ul>
                <Mode/>
            </div>
            <button className="menu__button" type="button" onClick={toggleMenu}>
                <div className="menu__button-lines">
                    <div
                        className={`menu__button-line-top ${isOpen ? "menu__button-line-top--open" : ""} ${isClosed ? "menu__button-line-top--close" : ""}`}>
                    </div>
                    <div
                        className={`menu__button-line-middle ${isOpen ? "menu__button-line-middle--open" : ""} ${isClosed ? "menu__button-line-middle--close" : ""}`}>
                    </div>
                    <div
                        className={`menu__button-line-bottom ${isOpen ? "menu__button-line-bottom--open" : ""} ${isClosed ? "menu__button-line-bottom--close" : ""}`}>
                    </div>
                </div>
            </button>
        </nav>
    );
}