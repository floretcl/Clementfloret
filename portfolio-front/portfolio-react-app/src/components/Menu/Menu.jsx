import {useState} from "react";
import Mode from "../Mode/Mode.jsx";
import MenuLink from "./MenuLink.jsx";


export default function Menu() {
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const menuLinks = JSON.parse(document.getElementById("menu-links").textContent);

    const listLinks = menuLinks.map((link) =>
        <MenuLink key={link.id} name={link.name} url={link.url} />
    );

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
                    {listLinks}
                </ol>
            </div>
        </div>
    );
}