import Social from "../Social/Social.jsx";
import PropTypes from "prop-types";
import '../../styles/Footer.scss'

export default function Footer({small}) {
    const fullYear = new Date().getFullYear();
    const portfolio = JSON.parse(document.getElementById("portfolio").textContent);

    return (
        <footer className="footer">
            <div className={`${small ? "footer__content--home" : "footer__content"}`}>
                { !small && (
                    <div className="footer__contact">
                        <a className="hoverable" href="/contact">Contact</a>
                    </div>
                )}
                <div className="footer__infos">
                    © {fullYear} {portfolio.firstname} {portfolio.lastname}, All rights reserved
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