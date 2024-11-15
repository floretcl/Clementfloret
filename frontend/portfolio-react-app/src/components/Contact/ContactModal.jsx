import PropTypes from "prop-types";
import '../../styles/ContactModal.scss'
import {useTranslation} from "react-i18next";

export function ContactModal({message, onClick}) {
    const {t} = useTranslation();

    return (
        <section>
            <div className="contact-modal" aria-labelledby={t('contact_modal')} role="dialog" aria-modal="true">
                <div className="contact-modal__background"></div>
                <div className="contact-modal__modal">
                    <div className="contact-modal__content">
                        <div className="contact-modal__head">
                            <button className="contact-modal__close-button"
                                    type="button"
                                    title={t('close_button')}
                                    onClick={onClick}>
                                <svg width="383" height="511" viewBox="0 0 383 511" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M76 143L300 367" stroke="currentColor" strokeWidth="33.4783"
                                          strokeLinecap="round"/>
                                    <path d="M76 366.188L300 142.188" stroke="currentColor" strokeWidth="33.4783"
                                          strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="contact-modal__main">
                            <div className="contact-modal__icon">
                                {message.includes('Your message has been sent') ?
                                    <svg width="512" height="512" viewBox="0 0 512 512" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M256 469.333C138.179 469.333 42.6667 373.82 42.6667 256C42.6667 138.179 138.179 42.6667 256 42.6667C373.82 42.6667 469.333 138.179 469.333 256C469.333 373.82 373.82 469.333 256 469.333ZM234.722 341.333L385.572 190.484L355.403 160.314L234.722 280.994L174.383 220.653L144.213 250.825L234.722 341.333Z"
                                            fill="currentColor"/>
                                    </svg>
                                    :
                                    <svg width="512" height="512" viewBox="0 0 512 512" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M256 469.333C138.179 469.333 42.6667 373.82 42.6667 256C42.6667 138.179 138.179 42.6667 256 42.6667C373.82 42.6667 469.333 138.179 469.333 256C469.333 373.82 373.82 469.333 256 469.333ZM234.667 320V362.667H277.333V320H234.667ZM234.667 149.333V277.333H277.333V149.333H234.667Z"
                                            fill="currentColor"/>
                                    </svg>
                                }
                            </div>
                            <div className="contact-modal__message">
                                <p>{message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

ContactModal.propTypes = {
    message: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}