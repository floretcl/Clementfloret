import {useState} from "react";
import Mode from "./Mode";

export default function Menu() {
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        if (isActive === true) {
            setIsOpen(false);
            setTimeout(() => {
                setIsActive(false);
            }, 500);
        } else {
            setIsOpen(true);
            setIsActive(true);
        }
    }

    // TODO : href
    return (
        <div
            className={`menu ${isActive ? "menu--active" : ""} ${isOpen ? "menu--open" : "menu--close"}`}>
            <button className="menu__button" type="button" onClick={toggleMenu}>
                <div className="menu__button-lines">
                    <div className="menu__button-line-top"></div>
                    <div className="menu__button-line-middle"></div>
                    <div className="menu__button-line-bottom"></div>
                </div>
            </button>
            <div className="menu__content">
                <Mode/>
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
            </div>
        </div>
    );
}