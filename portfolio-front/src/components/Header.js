import Logo from "./Logo.js";
import Menu from "./Menu.js";

export default function Header() {
    return (
        <header className="header">
            <Logo />
            <Menu />
        </header>
    );
}
