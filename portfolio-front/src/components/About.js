import html5Icon from "../svg/html5-fill.svg";
import css3Icon from "../svg/css3-fill.svg";
import jsIcon from "../svg/javascript-fill.svg";
import phpIcon from "../svg/php-fill.svg";
import pythonIcon from "../svg/python-fill.svg";
import djangoIcon from "../svg/django-fill.svg";
import mariaDBIcon from "../svg/mariadb-fill.svg";
import mySQLIcon from "../svg/mysql-fill.svg";
import postgreSQLIcon from "../svg/postgresql-fill.svg";
import sassIcon from "../svg/sass-fill.svg";
import tailwindIcon from "../svg/tailwindcss-fill.svg";
import bootstrapIcon from "../svg/bootstrap-fill.svg";
import kotlinIcon from "../svg/kotlin-fill.svg";
import swiftIcon from "../svg/swift-fill.svg";
import npmIcon from "../svg/npmjs-fill.svg";
import wordpressIcon from "../svg/wordpress-fill.svg";
import gitIcon from "../svg/git-fill.svg";
import figmaIcon from "../svg/figma-fill.svg";
import separator from "../svg/separator.svg";
import avatar from "../img/avatar.webp";

export default function About() {
    return (
        <main className="about">
            <img className="about__avatar" src={avatar} alt=""/>
            <h1 className="about__title">About me</h1>
            <p className="about__text">
                After several years in the industrial sector, I decided to change careers and pursue my passion for IT,
                particularly development. To make my project a success, I undertook training and obtained the RNCP title
                of Web and Mobile Web Developer. Today, I am seeking to apply my skills as an application developer.
            </p>
            <img className="about__separator" src={separator} alt=""/>
            <h2 className="about__subtitle">Skills</h2>
            <ul className="about__skills">
                <li>HTML</li>
                <span> - </span>
                <li>CSS</li>
                <span> - </span>
                <li>Sass</li>
                <span> - </span>
                <li>Javascript</li>
                <span> - </span>
                <li>PHP</li>
                <span> - </span>
                <li>Python</li>
                <span> - </span>
                <li>Swift</li>
                <span> - </span>
                <li>Kotlin</li>
                <span> - </span>
                <li>Bootstrap</li>
                <span> - </span>
                <li>TailwindCSS</li>
                <span> - </span>
                <li>Django</li>
                <span> - </span>
                <li>SwiftUI</li>
                <span> - </span>
                <li>Jetpack compose</li>
                <span> - </span>
                <li>SQL</li>
                <span> - </span>
                <li>MariaDB/MySQL</li>
                <span> - </span>
                <li>PostgreSQL</li>
                <span> - </span>
                <li>Git</li>
                <span> - </span>
                <li>GitHub</li>
                <span> - </span>
                <li>PyCharm</li>
                <span> - </span>
                <li>PhpStorm</li>
                <span> - </span>
                <li>VScode</li>
                <span> - </span>
                <li>Xcode</li>
                <span> - </span>
                <li>Android Studio</li>
                <span> - </span>
                <li>Figma</li>
                <span> - </span>
                <li>Wordpress</li>
                <span> - </span>
                <li>MacOS</li>
                <span> - </span>
                <li>GNU/Linux</li>
            </ul>
            <ul className="about__icons">
                <li><img src={html5Icon} alt=""/></li>
                <li><img src={css3Icon} alt=""/></li>
                <li><img src={jsIcon} alt=""/></li>
                <li><img src={phpIcon} alt=""/></li>
                <li><img src={pythonIcon} alt=""/></li>
                <li><img src={djangoIcon} alt=""/></li>
                <li><img src={mariaDBIcon} alt=""/></li>
                <li><img src={mySQLIcon} alt=""/></li>
                <li><img src={postgreSQLIcon} alt=""/></li>
                <li><img src={sassIcon} alt=""/></li>
                <li><img src={tailwindIcon} alt=""/></li>
                <li><img src={bootstrapIcon} alt=""/></li>
                <li><img src={kotlinIcon} alt=""/></li>
                <li><img src={swiftIcon} alt=""/></li>
                <li><img src={npmIcon} alt=""/></li>
                <li><img src={wordpressIcon} alt=""/></li>
                <li><img src={gitIcon} alt=""/></li>
                <li><img src={figmaIcon} alt=""/></li>
            </ul>
        </main>
    );
}