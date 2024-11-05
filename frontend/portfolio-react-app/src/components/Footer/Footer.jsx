import Social from "../Social/Social.jsx";
import PropTypes from "prop-types";
import '../../styles/Footer.scss'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

export default function Footer({small}) {
    const {t} = useTranslation();
    const [portfolio, setPortfolio] = useState({});
    const fullYear = new Date().getFullYear();

    useEffect(() => {
        fetchPortfolio();
    }, []);

    function fetchPortfolio() {
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

    return (
        <footer className="footer">
            <div className={`${small ? "footer__content--home" : "footer__content"}`}>
                {!small && (
                    <div className="footer__contact">
                        <a className="hoverable" href="/contact">{t('contact_title')}</a>
                    </div>
                )}
                <div className="footer__infos">
                    © {fullYear} {portfolio && `${portfolio.firstname} ${portfolio.lastname}, ${t('footer_infos')}`}
                </div>
                {!small && (
                    <div className="footer__social">
                        <Social/>
                    </div>
                )}
            </div>
        </footer>
    );
}

Footer.propTypes = {
    small: PropTypes.bool.isRequired
}