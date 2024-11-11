import PropTypes from "prop-types";
import '../../styles/ContactModal.scss'

export function ContactModal({message, onClick}) {
    return (
        <section>
            <div className="contact-modal" aria-labelledby="contact-modal-title" role="dialog" aria-modal="true">
                <div className="contact-modal__background"></div>
                <div className="contact-modal__modal">
                    <div className="contact-modal__content">
                        <div className="contact-modal__head">
                            <button className="contact-modal__close-button"
                                    type="button"
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     fill="currentColor"
                                     className="">
                                    <path fillRule="evenodd"
                                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                          clipRule="evenodd"></path>
                                </svg>
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