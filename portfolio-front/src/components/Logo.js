import logo from "../svg/logo-cf.svg";

export default function Logo() {
    // TODO : href
    return (
        <a href="#">
            <img className="header__logo" src={logo} alt="clementfloret.dev logo"/>
        </a>
    );
}
