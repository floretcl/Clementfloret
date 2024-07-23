import SocialLink from "./SocialLink.jsx";

export default function Social() {
    const links = JSON.parse(document.getElementById("social-links").textContent);

    const listLinks = links.map((link) =>
        <SocialLink key={link.id} name={link.name} imgSrc={link.imgSrc} url={link.url}/>
    );

    return (
        <ol className="social">
            {listLinks}
        </ol>
    );
}