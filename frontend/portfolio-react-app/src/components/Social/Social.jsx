import SocialLink from "./SocialLink.jsx";
import '../../styles/Social.scss'

export default function Social() {
    const links = JSON.parse(document.getElementById("social-links").textContent);

    const listLinks = links.map((link) =>
        <SocialLink key={link.id} name={link.name} imgSrc={link.image} url={link.url}/>
    );

    return (
        <ol className="social">
            {listLinks}
        </ol>
    );
}