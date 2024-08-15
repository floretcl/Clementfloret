import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export default function ProjectLink({url, name, icon}) {
    const { t } = useTranslation();

    return (
        <li>
            <a className="project__link hoverable" href={url} target="_blank" title={`${t('link_to')} ${name}`}>
                <img className="project__icon" src={icon} alt={`${name} ${t('icon')}`}/>
                {name}
            </a>
        </li>
    );
}

ProjectLink.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}