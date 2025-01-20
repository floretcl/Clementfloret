import {useState} from "react";
import Mode from "../Mode/Mode.jsx";
import MenuLink from "./MenuLink.jsx";
import '../../styles/Menu.scss'
import {useTranslation} from "react-i18next";


export default function Menu() {
    const {i18n ,t } = useTranslation();
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const menuLinks =
        [{
            "id": 0,
            "name": t('home'),
            "url": "/" + i18n.language + "/"
        }, {
            "id": 1,
            "name": t('about'),
            "url": "/" + i18n.language + "/about/"
        }, {
            "id": 2,
            "name": t('projects'),
            "url": "/" + i18n.language + "/projects/"
        }, {
            "id": 3,
            "name": t('contact'),
            "url": "/" + i18n.language + "/contact/"
        },{
            "id": 4,
            "name": "FR",
            "url": "/fr/"
        }, {
            "id": 5,
            "name": "EN",
            "url": "/en/"
        }];

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
            <button className="menu__button hoverable" type="button" title={t('menu_button')} onClick={toggleMenu}>
                <div className="menu__button-lines">
                    <div className="menu__button-line-top"></div>
                    <div className="menu__button-line-middle"></div>
                    <div className="menu__button-line-bottom"></div>
                </div>
            </button>
            <div className="menu__content">
                <Mode/>
                <ol className="menu__list">
                    {menuLinks && menuLinks.map((link) =>
                        <MenuLink key={link.id} name={link.name} url={link.url} toggleMenu={toggleMenu} reloadDocument/>
                    )}
                </ol>
            </div>
        </div>
    );
}