import Social from "../Social/Social.jsx";

export default function Footer({contactUrl, small}) {
    const fullYear = new Date().getFullYear();

    return (
        <footer className={`footer ${small ? "footer--home" : ""}`}>
            <div className="footer__content">
                { !small && (
                    <div className="footer__contact">
                        <a className="hoverable" href={contactUrl}>Contact</a>
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