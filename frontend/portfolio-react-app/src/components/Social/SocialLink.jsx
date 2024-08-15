import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export default function SocialLink({name, imgSrc, url}) {
    const { t } = useTranslation();

    return (
        <li>
            <a className="social__link hoverable" href={url} target="_blank">
                <img className="social__icon" src={imgSrc}  alt={`${name} ${t('icon')}`}/>
            </a>
        </li>
    );
}

SocialLink.propTypes = {
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};