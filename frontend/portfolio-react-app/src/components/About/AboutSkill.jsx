import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export default function AboutSkill({name, icon}) {
    const { t } = useTranslation();

    return (
        <li className="hoverable">
            <img src={icon} alt={`${name} ${t('icon')}`}/>
            <div>{name}</div>
        </li>
    );
}

AboutSkill.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}