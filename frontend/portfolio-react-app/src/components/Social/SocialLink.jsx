import PropTypes from "prop-types";

export default function SocialLink({name, imgSrc, url}) {
    return (
        <li>
            <a className="social__link hoverable" href={url} target="_blank">
                <img className="social__icon" src={imgSrc}  alt={`${name} icon`}/>
            </a>
        </li>
    );
}

SocialLink.propTypes = {
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};