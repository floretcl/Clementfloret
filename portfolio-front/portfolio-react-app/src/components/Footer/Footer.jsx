import Social from "../Social/Social.jsx";
import PropTypes from "prop-types";

export default function Footer({small}) {
    const fullYear = new Date().getFullYear();

    return (
        <footer className={`footer ${small ? "footer--home" : ""}`}>
            <div className="footer__content">
                { !small && (
                    <div className="footer__contact">
                        <a className="hoverable" href="/contact">Contact</a>
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

Footer.propTypes = {
    small: PropTypes.bool.isRequired
}