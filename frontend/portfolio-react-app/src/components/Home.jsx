import Social from "./Social/Social.jsx";
import ResumeButton from "./ResumeButton/ResumeButton.jsx";
import '../styles/Home.scss'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

export default function Home() {
    const [portfolio, setPortfolio] = useState({});
    const {t} = useTranslation();

    useEffect(() => {
        function fetchRequest() {
            const pathName = window.location.pathname;
            const langPrefix = pathName.startsWith('/fr/') ? '/fr' : pathName.startsWith('/en/') ? '/en' : '';
            const url = `${langPrefix}/api/portfolio`;

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
                    setPortfolio(data);
                })
                .catch(error => {
                    console.log(`Error getting portfolio data: ${error}`);
                });
        }
        fetchRequest();
    }, [portfolio]);

    return (
        <main className="home">
            <h1 className="home__title">{t('home_title')} <strong>{portfolio.firstname} {portfolio.lastname}</strong></h1>
            <p className="home__subtitle">{portfolio.job_title}</p>
            <div className="home__social">
                <Social/>
            </div>
            <div className="home__resume">
                <ResumeButton url={portfolio.resume} />
            </div>
        </main>
    );
}