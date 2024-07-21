import PropTypes from "prop-types";

export default function SocialLink({svg, url}) {
    return (
        <li>
            <a className="social__link hoverable" href={url}>
                {svg}
            </a>
        </li>
    );
}

SocialLink.propTypes = {
  svg: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};