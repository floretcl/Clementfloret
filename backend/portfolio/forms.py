import environ
from django import forms
from django.core.mail import send_mail
env = environ.Env()
environ.Env.read_env()

class ContactForm(forms.Form):
    name = forms.CharField(label='Name', max_length=100, min_length=3)
    email = forms.EmailField(label='Email', max_length=100, min_length=3)
    subject = forms.CharField(label='Subject', max_length=200, min_length=5)
    message = forms.CharField(widget=forms.Textarea, label='Message', min_length=10)

    def send_email(self):
        name = self.cleaned_data['name']
        subject = self.cleaned_data['subject']
        email = self.cleaned_data['email']
        message = self.cleaned_data['message']
        send_mail(
            subject=f'Message de contact de {name} - sujet: {subject}',
            message=f'Nom: {name}\nEmail: {email}\nSujet: {subject}\n\nMessage: {message}',
            from_email=env('EMAIL_HOST_USER'),
            recipient_list=['clement.floret@protonmail.com']
        )
        pass
