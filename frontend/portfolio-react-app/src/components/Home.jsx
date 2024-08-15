import Social from "./Social/Social.jsx";
import ResumeButton from "./ResumeButton/ResumeButton.jsx";
import '../styles/Home.scss'
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();
    const portfolio = JSON.parse(document.getElementById("portfolio").textContent);

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