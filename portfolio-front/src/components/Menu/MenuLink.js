export default function MenuLink({name, url}) {
    return (
        <li className="menu__link">
            <a className="hoverable" href={url}>{name}</a>
            <hr className="menu__divider"/>
        </li>
    );
}