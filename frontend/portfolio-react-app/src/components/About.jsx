import AboutSkill from "./AboutSkill/AboutSkill.jsx";
import '../styles/About.scss'

export default function About() {
    const portfolio = JSON.parse(document.getElementById("portfolio").textContent)
    const skills = JSON.parse(document.getElementById("skills").textContent);

    const listSkills = skills.map(skill =>
        <AboutSkill key={skill.id} name={skill.name} icon={skill.image} />
    );

    return (
        <main className="about">
            <img className="about__avatar" src={portfolio.image} alt={`${portfolio.firstname}'s ${portfolio.lastname} avatar`}/>
            <h1 className="about__title">About me</h1>
            <p className="about__text">
                {portfolio.about_description}
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
            <ol className="about__icons">
                {listSkills}
            </ol>
        </main>
    );
}