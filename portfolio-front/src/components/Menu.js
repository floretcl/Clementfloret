import {useState} from "react";
import Mode from "./Mode";

export default function Menu() {
    const [isActive, setIsActive] = useState(false);
    const btnLine1ClassName = `menu__button-line${isActive ? " menu__button-line--active1" : ""}`;
    const btnLine2ClassName = `menu__button-line${isActive ? " menu__button-line--active2" : ""}`;
    const btnLine3ClassName = `menu__button-line${isActive ? " menu__button-line--active3" : ""}`;

    // TODO : href
    return (
        <nav className="header__nav">
            {isActive && (
                <div className="menu">
                    <ul className="menu__list">
                        <li className="menu__link">
                            <a href="#">Home</a>
                            <hr className="menu__divider" />
                        </li>
                        <li className="menu__link">
                            <a href="#">About</a>
                            <hr className="menu__divider" />
                        </li>
                        <li className="menu__link">
                            <a href="#">Projects</a>
                            <hr className="menu__divider" />
                        </li>
                        <li className="menu__link">
                            <a href="#">Contact</a>
                            <hr className="menu__divider" />
                        </li>
                    </ul>
                    <Mode />
                </div>
            )}
            <button className="menu__button" type="button" onClick={() => setIsActive(!isActive)}>
                <div className="menu__button-lines">
                    <div className={btnLine1ClassName}></div>
                    <div className={btnLine2ClassName}></div>
                    <div className={btnLine3ClassName}></div>
                </div>
            </button>
        </nav>
    );
}