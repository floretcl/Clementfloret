export default function Contact() {
    return (
        <main className="contact">
            <h1 className="contact__title">Contact</h1>
            <p className="contact__infos">Complete the form or email me directly at clement.floret@icloud.com</p>
            <form className="contact__form">
                <input type="text" id="name" name="name" minLength="3" maxLength="100" placeholder="Name" required/>
                <input type="email" id="email" name="email" minLength="3" maxLength="254" placeholder="Email" required/>
                <input type="text" id="subject" name="subject" minLength="5" maxLength="200" placeholder="Subject"/>
                <textarea id="message" name="message" minLength="10" placeholder="Message" rows="10" required></textarea>
                <input type="submit" value="Submit"/>
            </form>
        </main>
    );
}