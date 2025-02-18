import Social from "../Social/Social.jsx";
import '../../styles/Footer.scss'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";

export default function Footer({portfolio, portfolioLinks}) {
    const location = useLocation();
    const {t} = useTranslation();
    const [smallVersion, setSmallVersion] = useState(false);
    const fullYear = new Date().getFullYear();

    useEffect(() => {
        testSmallVersion(location);
    }, [location]);

    function testSmallVersion(location) {
        const regexp = new RegExp("^/(([a-z]){2}/)*$");
        const test = regexp.test(location.pathname);
        setSmallVersion(test);
    }

    return (
        <footer className="footer">
            <div className={`${smallVersion ? "footer__content--home" : "footer__content"}`}>
                {!smallVersion && (
                    <div className="footer__contact">
                        <a className="hoverable"
                           href="/contact"
                           aria-label={`${t('link_to')} ${t('contact')}`}>
                            {t('contact_title')}
                        </a>
                    </div>
                )}
                <div className="footer__infos">
                    {portfolio && `${portfolio.firstname}  ${portfolio.lastname}`} - {fullYear} {t('footer_infos')}
                </div>
                {!smallVersion && (
                    <div className="footer__social">
                        <Social portfolioLinks={portfolioLinks}/>
                    </div>
                )}
            </div>
        </footer>
    );
}

Footer.propTypes = {
    portfolio: PropTypes.object.isRequired,
    portfolioLinks: PropTypes.array.isRequired,
}
