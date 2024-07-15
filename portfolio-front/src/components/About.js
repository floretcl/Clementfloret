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
import avatar from "../img/avatar.webp";
import Item from "./Item";
import imgSrc1 from "../img/ales-nesetril-Im7lZjxeLhg-unsplash.webp";
import imgSrc2 from "../img/campaign-creators-OGOWDVLbMSc-unsplash.webp";
import imgSrc3 from "../img/christopher-gower-m_HRfLhgABo-unsplash.webp";
import imgSrc4 from "../img/domenico-loia-EhTcC9sYXsw-unsplash.webp";
import AboutSkill from "./AboutSkill";

export default function About() {
    const skills = [{
        id: 0,
        name: "HTML5",
        imgSrc: html5Icon
    }, {
        id: 1,
        name: "CSS3",
        imgSrc: css3Icon
    }, {
        id: 2,
        name: "Javascript",
        imgSrc: jsIcon
    }, {
        id: 3,
        name: "PHP",
        imgSrc: phpIcon
    }, {
        id: 4,
        name: "Python",
        imgSrc: pythonIcon
    }, {
        id: 5,
        name: "Django",
        imgSrc: djangoIcon
    }, {
        id: 6,
        name: "MariaDB",
        imgSrc: mariaDBIcon
    }, {
        id: 7,
        name: "MySQL",
        imgSrc: mySQLIcon
    }, {
        id: 8,
        name: "PostgreSQL",
        imgSrc: postgreSQLIcon
    }, {
        id: 9,
        name: "Sass",
        imgSrc: sassIcon
    }, {
        id: 10,
        name: "Tailwind",
        imgSrc: tailwindIcon
    }, {
        id: 11,
        name: "Bootstrap",
        imgSrc: bootstrapIcon
    }, {
        id: 12,
        name: "Kotlin",
        imgSrc: kotlinIcon
    }, {
        id: 13,
        name: "Swift",
        imgSrc: swiftIcon
    }, {
        id: 14,
        name: "Npm",
        imgSrc: npmIcon
    }, {
        id: 15,
        name: "Wordpress",
        imgSrc: wordpressIcon
    }, {
        id: 16,
        name: "Git",
        imgSrc: gitIcon
    }, {
        id: 17,
        name: "Figma",
        imgSrc: figmaIcon
    }]

    const listSkills = skills.map(skill =>
        <AboutSkill key={skill.id} id={skill.id} name={skill.name} icon={skill.imgSrc} />
    );

    return (
        <main className="about">
            <img className="about__avatar" src={avatar} alt="Clément's Floret avatar"/>
            <h1 className="about__title">About me</h1>
            <p className="about__text">
                After several years in the industrial sector, I decided to change careers and pursue my passion for IT,
                particularly development. To make my project a success, I undertook training and obtained the RNCP title
                of Web and Mobile Web Developer. <br/>
                Today, I am seeking to apply my skills as an application developer.
            </p>
            <div className="about__separator hoverable">
                <svg width="118" height="94" viewBox="0 0 118 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.52405 18.3956L37.5 1.70392L68.476 18.3956V51.6044L37.5 68.2961L6.52405 51.6044V18.3956Z"
                          stroke="currentColor" strokeWidth="3"/>
                    <path d="M49.524 42.3956L80.5 25.7039L111.476 42.3956V75.6044L80.5 92.2961L49.524 75.6044V42.3956Z"
                          stroke="currentColor" strokeWidth="3"/>
                </svg>
            </div>
            <h2 className="about__subtitle">Skills</h2>
            <ul className="about__icons">
                {listSkills}
            </ul>
        </main>
    );
}