import {useState} from "react";
import '../styles/Contact.scss'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const email = JSON.parse(document.getElementById("portfolio").textContent).contact_email;

    const csrftoken = getCookie('csrftoken');

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const requestUrl = "/contact/";
        const requestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(formData),
            mode: 'same-origin'
        };

        fetch(requestUrl, requestInit)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setSuccessMessage(data.message);
                    setErrorMessage("");
                    setErrors({});
                    setFormData({name: "", email: "", subject: "", message: ""});
                } else {
                    setErrorMessage(data.message);
                    setErrors(data.errors);
                }
            })
            .catch(error => {
                setErrorMessage("Your message could not be sent.");
                // Pour obtenir les erreurs du serveur
                if (error.response) {
                    error.response.json()
                        .then(errorData => {
                            setErrors(errorData.errors || {});
                        });
                } else {
                    setErrors({});
                }
            });
    }

    return (
        <main className="contact">
            <h1 className="contact__title">Contact</h1>
            {successMessage && <div className="success">{successMessage}</div>}
            {errorMessage && <div className="error">{errorMessage}</div>}
            <p className="contact__infos">
                Complete the form or email me directly at <a className="hoverable"
                                                             href={`mailto: ${email}`}
                                                             title="send me an email">{email}</a>
            </p>
            <form className="contact__form" onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" minLength="3" maxLength="100" placeholder="Name" required
                       value={formData.name} onChange={handleChange}/>
                {errors.name && <div className="error">{errors.name}</div>}

                <input type="email" id="email" name="email" minLength="3" maxLength="254" placeholder="Email" required
                       value={formData.email} onChange={handleChange}/>
                {errors.email && <div className="error">{errors.email}</div>}

                <input type="text" id="subject" name="subject" minLength="5" maxLength="200" placeholder="Subject"
                       required value={formData.subject} onChange={handleChange}/>
                {errors.subject && <div className="error">{errors.subject}</div>}

                <textarea id="message" name="message" minLength="10" placeholder="Message" rows="10" required
                          value={formData.message} onChange={handleChange}/>
                {errors.message && <div className="error">{errors.message}</div>}

                <input className="hoverable" type="submit" value="Submit"/>
            </form>
        </main>
    );
}