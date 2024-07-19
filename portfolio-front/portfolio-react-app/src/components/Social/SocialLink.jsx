export default function SocialLink({svg, url}) {
    return (
        <li>
            <a className="social__link hoverable" href={url}>
                {svg}
            </a>
        </li>
    );
}