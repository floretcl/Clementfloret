import {useEffect, useRef, useState} from "react";
import '../styles/Contact.scss'
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {ContactModal} from "./Contact/ContactModal.jsx";

export default function Contact({email}) {
    let params = useParams();
    const {t} = useTranslation();
    const lang = useRef(params.lang);
    const [csrfToken, setCsrfToken] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setCsrfToken(getCsrfToken());
    }, [])

    function getCsrfToken() {
        if (document.cookie && document.cookie !== '') {
            const cookie = document.cookie.split(';').find(row => row.startsWith('csrftoken='));
            return cookie ? cookie.split("=")[1] : "";
        } else {
            return "";
        }
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const requestUrl = `/${lang.current}/api/contact`;
        const requestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formData),
            mode: 'same-origin'
        };

        fetch(requestUrl, requestInit)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setMessage(data.message);
                    setErrors({});
                    setFormData({name: "", email: "", subject: "", message: ""});
                } else {
                    setMessage(data.message);
                    setErrors(data.errors);
                }
            })
            .catch(error => {
                setMessage(t('contact_error_message'));
                // To get server errors
                if (error.response) {
                    error.response.json()
                        .then(errorData => {
                            setErrors(errorData.errors || {});
                        });
                } else {
                    setErrors({});
                }
            });
        setModalVisible(true);
    }

    return (
        <main className="contact">
            <h1 className="contact__title">{t('contact_title')}</h1>
            {modalVisible &&
                <ContactModal message={message} onClick={() => setModalVisible(false)} />
            }
            <p className="contact__infos">
                {t('contact_infos')} <a className="hoverable" href={`mailto: ${email}`}
                                        title={t('contact_infos_title')}>{email}</a>
            </p>
            <form className="contact__form" onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" minLength="3" maxLength="100" placeholder={t('contact_name_placeholder')} required
                       value={formData.name} onChange={handleChange}/>
                {errors.name && <div className="error">{errors.name}</div>}

                <input type="email" id="email" name="email" minLength="3" maxLength="254" placeholder={t('contact_email_placeholder')} required
                       value={formData.email} onChange={handleChange}/>
                {errors.email && <div className="error">{errors.email}</div>}

                <input type="text" id="subject" name="subject" minLength="5" maxLength="200" placeholder={t('contact_subject_placeholder')}
                       required value={formData.subject} onChange={handleChange}/>
                {errors.subject && <div className="error">{errors.subject}</div>}

                <textarea id="message" name="message" minLength="10" placeholder={t('contact_message_placeholder')} rows="10" required
                          value={formData.message} onChange={handleChange}/>
                {errors.message && <div className="error">{errors.message}</div>}

                <input className="hoverable" type="submit" value={t('contact_button_value')}/>
            </form>
        </main>
    );
}

Contact.propTypes = {
    email: PropTypes.string.isRequired,
}