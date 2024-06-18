export default function Contact() {
    return (
        <main className="contact">
            <h1>Contact</h1>
            <p>Send me an email directly on clement.floret@icloud.com</p>
            <form>
                <input type="text" id="name" name="name" minLength="3" maxLength="100" placeholder="Name" required/>
                <input type="email" id="email" name="email" minLength="3" maxLength="254" placeholder="Email" required/>
                <input type="text" id="subject" name="subject" minLength="5" maxLength="200" placeholder="Subject" required/>
                <textarea id="message" name="message" minLength="10" placeholder="Message" required></textarea>
            </form>
        </main>
    );
}