import {useState} from "react";
import Mode from "../Mode/Mode.jsx";
import MenuLink from "./MenuLink.jsx";
import '../../styles/Menu.scss'
import {useTranslation} from "react-i18next";


export default function Menu() {
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const menuLinks =
        [{
            "id": 0,
            "name": t('home'),
            "url": "/"
        }, {
            "id": 1,
            "name": t('about'),
            "url": "/about"
        }, {
            "id": 2,
            "name": t('projects'),
            "url": "/projects"
        }, {
            "id": 3,
            "name": t('contact'),
            "url": "/contact"
        }];

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