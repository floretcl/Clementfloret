import PropTypes from "prop-types";
import '../../styles/ResumeButton.scss'
import {useTranslation} from "react-i18next";

export default function ResumeButton({url}) {
    const { t } = useTranslation();

    return (
        <div className="resumeButton">
            <svg width="512" height="490" viewBox="0 0 512 490" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M53.2975 133.488L256 21.6979L458.703 133.488V355.587L256 467.377L53.2975 355.587V133.488Z"
                    stroke="currentColor" strokeWidth="18"/>
            </svg>
            <a
                className="hoverable"
                href={url}
                target={"_blank"}
                aria-label={`${t('link_to')} ${t('resume')}`}>
                {t('resume')}<br/>
                Pdf
            </a>
        </div>
    );
}

ResumeButton.propTypes = {
    url: PropTypes.string.isRequired
}