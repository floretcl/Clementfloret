import SocialLink from "./SocialLink.jsx";
import '../../styles/Social.scss'
import PropTypes from "prop-types";

export default function Social({portfolioLinks}) {
    return (
        <ol className="social">
            {portfolioLinks && portfolioLinks.map((link) =>
                <SocialLink key={link.id} name={link.name} imgSrc={link.icon} url={link.url}/>
            )}
        </ol>
    );
}

Social.propTypes = {
    portfolioLinks: PropTypes.array.isRequired,
}