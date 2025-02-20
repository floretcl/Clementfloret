import Menu from "../Menu/Menu.jsx";
import PropTypes from "prop-types";
import '../../styles/Header.scss'
import {useTranslation} from "react-i18next";
import i18n from "i18next";

export default function Header({scrollDown}) {
    const lang = i18n.language;
    const { t } = useTranslation();
    const langPrefix = lang === "en" ? "/en/" : "/";

    return (
        <header className={`header ${scrollDown ? "header--scrolldown" : ""}`}>
            <div className="header__content">
                <a className="header__logo hoverable" href={langPrefix} aria-label={`${t('link_to')} ${t('home')}`}>
                    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="512" height="512" fill="none"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M279.904 75L150 0L20.0962 75V225L150 300L279.904 225V75ZM113.921 229.74C125.121 237.487 138.467 241.36 153.961 241.36C167.681 241.36 179.721 238.933 190.081 234.08C200.534 229.227 208.654 222.32 214.441 213.36C220.227 204.307 223.121 193.48 223.121 180.88H199.321C199.321 193.013 195.214 202.813 187.001 210.28C178.881 217.747 167.867 221.48 153.961 221.48C142.387 221.48 132.774 218.353 125.121 212.1C117.561 205.847 111.867 197.26 108.041 186.34C104.307 175.42 102.441 162.96 102.441 148.96C102.441 133.56 104.821 120.633 109.581 110.18C114.341 99.7267 120.594 91.8867 128.341 86.66C136.181 81.34 144.721 78.68 153.961 78.68C164.601 78.68 173.887 81.9467 181.821 88.48C189.847 94.92 195.681 103.6 199.321 114.52L222.841 109.76C218.547 94.7333 210.661 82.5533 199.181 73.22C187.794 63.7933 172.721 59.08 153.961 59.08C139.774 59.08 126.987 62.5333 115.601 69.44C104.307 76.2533 95.3473 86.3333 88.7206 99.68C82.1873 113.027 78.9206 129.453 78.9206 148.96C78.9206 167.253 81.954 183.353 88.0206 197.26C94.0873 211.073 102.721 221.9 113.921 229.74Z"
                              fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M475.904 225L346 150L216.096 225V375L346 450L475.904 375V225ZM301.362 212.16V388H323.202V308.2H402.442V289.44H323.202V230.92H408.322V212.16H301.362Z"
                              fill="currentColor"/>
                    </svg>
                </a>
                <nav className={`header__nav`}>
                    <Menu/>
                </nav>
            </div>
        </header>
    );
}

Header.propTypes = {
    scrollDown: PropTypes.bool.isRequired
}
