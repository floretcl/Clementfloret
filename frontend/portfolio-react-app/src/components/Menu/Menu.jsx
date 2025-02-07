import {useState} from "react";
import Mode from "../Mode/Mode.jsx";
import MenuLink from "./MenuLink.jsx";
import '../../styles/Menu.scss'
import {useTranslation} from "react-i18next";
import i18n from "i18next";


export default function Menu() {
    const lang = i18n.language;
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const langPrefix = lang === "en" ? "/en/" : "/";

    const menuLinks =
        [{
            "id": 0,
            "name": t('home'),
            "url": `${langPrefix}`,
            "reload": false
        }, {
            "id": 1,
            "name": t('about'),
            "url": `${langPrefix}about`,
            "reload": false
        }, {
            "id": 2,
            "name": t('projects'),
            "url": `${langPrefix}projects`,
            "reload": false
        }, {
            "id": 3,
            "name": t('contact'),
            "url": `${langPrefix}contact`,
            "reload": false
        },{
            "id": 4,
            "name": "FR",
            "url": "/",
            "reload": true
        }, {
            "id": 5,
            "name": "EN",
            "url": "/en/",
            "reload": true
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
                        <MenuLink key={link.id} name={link.name} url={link.url} reload={link.reload} toggleMenu={toggleMenu}/>
                    )}
                </ol>
            </div>
        </div>
    );
}