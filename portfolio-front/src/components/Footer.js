import Social from "./Social";

export default function Footer() {
    const fullYear = new Date().getFullYear();
    // TODO : href
    return (
        <footer className="footer">
            <div className="footer__contact">
                <a href="#">Contact</a>
            </div>
            <div className="footer__infos">
                © {fullYear} Clément Floret, All rights reserved
            </div>
            <Social />
        </footer>
    );
}