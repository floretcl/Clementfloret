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

    return (
        <div
            className={`menu ${isActive ? "menu--active" : ""} ${isOpen ? "menu--open" : "menu--close"}`}>
            <button className="menu__button hoverable" type="button" onClick={toggleMenu}>
                <div className="menu__button-lines">
                    <div className="menu__button-line-top"></div>
                    <div className="menu__button-line-middle"></div>
                    <div className="menu__button-line-bottom"></div>
                </div>
            </button>
            <div className="menu__content">
                <Mode/>
                <ol className="menu__list">
                    <li className="menu__link">
                        <a className="hoverable" href="#">Home</a>
                        <hr className="menu__divider"/>
                    </li>
                    <li className="menu__link">
                        <a className="hoverable" href="#">About</a>
                        <hr className="menu__divider"/>
                    </li>
                    <li className="menu__link">
                        <a className="hoverable" href="#">Projects</a>
                        <hr className="menu__divider"/>
                    </li>
                    <li className="menu__link">
                        <a className="hoverable" href="#">Contact</a>
                        <hr className="menu__divider"/>
                    </li>
                </ol>
            </div>
        </div>
    );
}