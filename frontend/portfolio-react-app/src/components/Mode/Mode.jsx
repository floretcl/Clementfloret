import {useContext, useState} from "react";
import {ThemeContext} from "../../ThemeContext.jsx";
import '../../styles/Mode.scss'
import {useTranslation} from "react-i18next";

export default function Mode() {
    const {t} = useTranslation();
    const {theme, setTheme} = useContext(ThemeContext);
    const [isClicked, setIsClicked] = useState(false);

    function toggleTheme() {
        setTheme((prevTheme) => {
            const nextTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", nextTheme);
            return nextTheme;
        });
    }

    function handleClick() {
        setIsClicked(!isClicked);

        // modify icon during animation
        setTimeout(() => {
            toggleTheme();
        }, 200);
    }

    return (
        <div className="mode">
            <button
                className={`mode__button ${isClicked ? "mode__button--active" : ""} hoverable`}
                type="button"
                title={t('mode_button_title')}
                onClick={handleClick}
                onAnimationEnd={() => setIsClicked(false)}>
                {(theme === "dark") ? (
                    <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22.5992 9.97791C20.8391 11.6225 19.7388 13.9645 19.7388 16.5634C19.7388 21.5402 23.7733 25.5746 28.75 25.5746C31.349 25.5746 33.6909 24.4744 35.3355 22.7143C34.9513 29.0033 29.7291 33.9851 23.3433 33.9851C16.7076 33.9851 11.3284 28.6058 11.3284 21.9702C11.3284 15.5844 16.3101 10.3622 22.5992 9.97791Z"
                            fill="currentColor"/>
                        <path
                            d="M4.58142 11.8708L23 1.71299L41.4186 11.8708V32.0695L23 42.2273L4.58142 32.0695V11.8708Z"
                            stroke="currentColor" strokeWidth="3"/>
                    </svg>
                ) : (
                    <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M23.3432 29.1791C19.3619 29.1791 16.1343 25.9515 16.1343 21.9701C16.1343 17.9887 19.3619 14.7612 23.3432 14.7612C27.3246 14.7612 30.5522 17.9887 30.5522 21.9701C30.5522 25.9515 27.3246 29.1791 23.3432 29.1791ZM22.1418 8.75372H24.5447V12.3582H22.1418V8.75372ZM22.1418 31.5821H24.5447V35.1866H22.1418V31.5821ZM13.1482 13.4743L14.8474 11.7751L17.3962 14.3239L15.697 16.0231L13.1482 13.4743ZM29.2903 29.6164L30.9895 27.9172L33.5383 30.466L31.8391 32.1652L29.2903 29.6164ZM31.8391 11.7751L33.5383 13.4743L30.9895 16.0231L29.2903 14.3239L31.8391 11.7751ZM15.697 27.9172L17.3962 29.6164L14.8474 32.1652L13.1482 30.466L15.697 27.9172ZM36.5597 20.7686V23.1716H32.9552V20.7686H36.5597ZM13.7313 20.7686V23.1716H10.1268V20.7686H13.7313Z"
                            fill="currentColor"/>
                        <path
                            d="M4.58142 11.8708L23 1.71299L41.4186 11.8708V32.0695L23 42.2273L4.58142 32.0695V11.8708Z"
                            stroke="currentColor" strokeWidth="3"/>
                    </svg>
                )}
            </button>
        </div>
    );
}
