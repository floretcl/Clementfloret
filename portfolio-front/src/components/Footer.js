import Social from "./Social";

export default function Footer({onHomePage}) {
    const fullYear = new Date().getFullYear();
    // TODO : href
    return (
        <footer className={`footer ${onHomePage ? "footer--home" : ""}`}>
            { !onHomePage && (
                <div className="footer__contact">
                    <a href="#">Contact</a>
                </div>
            )}
            <div className="footer__infos">
                © {fullYear} Clément Floret, All rights reserved
            </div>
            { !onHomePage && (
                <div className="footer__social">
                    <Social/>
                </div>
            )}
        </footer>
    );
}