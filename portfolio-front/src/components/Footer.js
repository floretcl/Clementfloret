import Social from "./Social";

export default function Footer({small}) {
    const fullYear = new Date().getFullYear();
    // TODO : href
    return (
        <footer className={`footer ${small ? "footer--home" : ""}`}>
            <div className="footer__content">
                { !small && (
                    <div className="footer__contact">
                        <a href="#">Contact</a>
                    </div>
                )}
                <div className="footer__infos">
                    © {fullYear} Clément Floret, All rights reserved
                </div>
                { !small && (
                    <div className="footer__social">
                        <Social/>
                    </div>
                )}
            </div>
        </footer>
    );
}