import AboutSkill from "./About/AboutSkill.jsx";
import '../styles/About.scss'
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

export default function About({portfolio}) {
    let params = useParams();
    const {t} = useTranslation();
    const lang = useRef(params.lang);
    const [portfolioSkills, setPortfolioSkills] = useState(null);

    function replaceWithBr(text) {
        return text.replace(/\n/g, "<br />");
    }

    useEffect(() => {
        fetchSkills();
    }, []);

    function fetchSkills() {
        const url = `${lang.current === "en" ? "/en" : ""}/api/portfolio_skills`;

        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'same-origin',
            cache: 'default',
        };

        fetch(url, init)
            .then(response => response.json())
            .then(data => {
                setPortfolioSkills(data);
            })
            .catch(error => {
                console.log(`Error getting portfolio skills data: ${error}`);
            });
    }

    return (
        <main className="about">
            {portfolio ? (
                <>
                    <img
                        className="about__avatar"
                        src={portfolio.avatar}
                        alt={`${portfolio.firstname}'s ${portfolio.lastname} ${t('avatar')}`}
                    />
                    <h1 className="about__title">{t('about_title')}</h1>
                    <h2 className="about__subtitle">{t('about_subtitle_profile')}</h2>
                    <p className="about__text" dangerouslySetInnerHTML={{ __html: replaceWithBr(portfolio.about_description) }} />
                    <div className="about__separator hoverable">
                        <svg width="118" height="94" viewBox="0 0 118 94" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.52405 18.3956L37.5 1.70392L68.476 18.3956V51.6044L37.5 68.2961L6.52405 51.6044V18.3956Z"
                                stroke="currentColor" strokeWidth="3"/>
                            <path
                                d="M49.524 42.3956L80.5 25.7039L111.476 42.3956V75.6044L80.5 92.2961L49.524 75.6044V42.3956Z"
                                stroke="currentColor" strokeWidth="3"/>
                        </svg>
                    </div>
                    <h2 className="about__subtitle">{t('about_subtitle_skills')}</h2>
                    <ol className="about__icons">
                        {portfolioSkills && portfolioSkills.map(skill =>
                            <AboutSkill key={skill.id} name={skill.name} icon={skill.icon}/>
                        )}
                    </ol>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}

About.propTypes = {
    portfolio: PropTypes.object.isRequired,
}