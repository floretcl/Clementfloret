from http import HTTPStatus

from django.conf import settings
from django.core import mail
from django.test import Client, TestCase
from django.urls.base import reverse, resolve

from portfolio.forms import ContactForm

class ContactTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client_csrf = Client(enforce_csrf_check=True)

    def test_url_en(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "en"})
        static_url = "/en/api/contact"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:contact")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:contact")
        self.assertEqual(resolve(static_url).view_name, "portfolio:contact")

    def test_url_fr(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "fr"})
        static_url = "/fr/api/contact"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:contact")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:contact")
        self.assertEqual(resolve(static_url).view_name, "portfolio:contact")

    def test_get(self):
        response = self.client.get("/api/contact")
        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/contact")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_get_fr(self):
        response = self.client.get("/fr/api/contact")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_post(self):
        response = self.client.post("/api/contact")
        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_post_en(self):
        static_url = "/en/api/contact"

        response = self.client_csrf.get(static_url)
        self.assertEqual(response.status_code, HTTPStatus.OK)

        csrf_token = response.cookies["csrftoken"].value

        form_data = {
            "name": "John Doe",
            "subject": "Sujet du message",
            "email": "johndoe@example.com",
            "message": "Contenu du message"
        }
        response_post = self.client_csrf.post(
            static_url,
            data=form_data,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrf_token
        )
        self.assertEqual(response_post.status_code, HTTPStatus.OK)
        self.assertEqual(response_post.json()["success"], True)

    def test_post_fr(self):
        static_url = "/fr/api/contact"

        response = self.client_csrf.get(static_url)
        self.assertEqual(response.status_code, HTTPStatus.OK)

        csrf_token = response.cookies["csrftoken"].value

        form_data = {
            "name": "John Doe",
            "subject": "Sujet du message",
            "email": "johndoe@example.com",
            "message": "Contenu du message"
        }
        response_post = self.client_csrf.post(
            static_url,
            data=form_data,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrf_token
        )
        self.assertEqual(response_post.status_code, HTTPStatus.OK)
        self.assertEqual(response_post.json()["success"], True)

    def test_post_no_csrf_token(self):
        static_url = "/en/api/contact"
        client_csrf = Client(enforce_csrf_checks=True)

        form_data = {
            "name": "John Doe",
            "subject": "Sujet du message",
            "email": "johndoe@example.com",
            "message": "Contenu du message"
        }
        response_post = client_csrf.post(
            static_url,
            data=form_data,
            content_type="application/json"
        )
        self.assertEqual(response_post.status_code, HTTPStatus.FORBIDDEN)

    def test_post_bad_csrf_token(self):
        static_url = "/en/api/contact"
        client_csrf = Client(enforce_csrf_checks=True)

        form_data = {
            "name": "John Doe",
            "subject": "Sujet du message",
            "email": "johndoe@example.com",
            "message": "Contenu du message"
        }
        response_post = client_csrf.post(
            static_url,
            data=form_data,
            content_type="application/json",
            HTTP_X_CSRFTOKEN="testtesttesttesttesttesttesttest"
        )
        self.assertEqual(response_post.status_code, HTTPStatus.FORBIDDEN)

    def test_post_no_data(self):
        response = self.client.post("/en/api/contact")
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)

    def test_send_email_correct_data(self):
        form_data = {
            "name": "John Doe",
            "subject": "Sujet du message",
            "email": "johndoe@example.com",
            "message": "Contenu du message"
        }
        form = ContactForm(form_data)
        self.assertTrue(form.is_valid())
        form.send_email()

        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertEqual(sent_email.subject, "Message de contact de John Doe - sujet: Sujet du message")
        self.assertEqual(sent_email.body, "Nom: John Doe\nEmail: johndoe@example.com\nSujet: Sujet du message\n\nMessage: Contenu du message")
        self.assertEqual(sent_email.from_email, "johndoe@example.com")
        self.assertEqual(sent_email.to, ["clement.floret@protonmail.com"])


    def test_send_email_missing_data(self):
        form_data = {
            "name": "",
            "subject": "Sujet du message",
            "email": "johndoe@example.com",
            "message": "Contenu du message"
        }
        form = ContactForm(form_data)
        self.assertFalse(form.is_valid())
        self.assertEqual(len(mail.outbox), 0)

    def test_send_email_bad_email_address(self):
        form_data = {
            "name": "John Doe",
            "subject": "Sujet du message",
            "email": "johndoe@.com",
            "message": "Contenu du message"
        }
        form = ContactForm(form_data)
        self.assertFalse(form.is_valid())
        self.assertEqual(len(mail.outbox), 0)

    def test_send_email_no_name(self):
        form_data = {
            "name": "",
            "subject": "Sujet du message",
            "email": "johndoe@example.com",
            "message": "Contenu du message"
        }
        form = ContactForm(form_data)
        self.assertFalse(form.is_valid())
        self.assertEqual(len(mail.outbox), 0)

    def test_send_email_no_subject(self):
        form_data = {
            "name": "John Doe",
            "subject": "",
            "email": "johndoe@.com",
            "message": "Contenu du message"
        }
        form = ContactForm(form_data)
        self.assertFalse(form.is_valid())
        self.assertEqual(len(mail.outbox), 0)

    def test_send_email_no_message(self):
        form_data = {
            "name": "John Doe",
            "subject": "Sujet du message",
            "email": "johndoe@.com",
            "message": ""
        }
        form = ContactForm(form_data)
        self.assertFalse(form.is_valid())
        self.assertEqual(len(mail.outbox), 0)