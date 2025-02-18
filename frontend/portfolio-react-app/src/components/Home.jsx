import Social from "./Social/Social.jsx";
import ResumeButton from "./ResumeButton/ResumeButton.jsx";
import '../styles/Home.scss'
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

export default function Home({portfolio, portfolioLinks}) {
    const {t} = useTranslation();

    return (
        <main className="home">
            {portfolio ? (
                <>
                    <h1 className="home__title">
                        {t('home_hello')}<br />
                        <strong>{portfolio.firstname} {portfolio.lastname}</strong>
                    </h1>
                    <p className="home__subtitle">{portfolio.job_title}</p>
                    <div className="home__social">
                        <Social portfolioLinks={portfolioLinks}/>
                    </div>
                    <div className="home__resume">
                        <ResumeButton url={portfolio.resume}/>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}

Home.propTypes = {
    portfolio: PropTypes.object.isRequired,
    portfolioLinks: PropTypes.array.isRequired,
}