from django import forms
from django.core.mail import send_mail

from clementfloret.settings import env


class ContactForm(forms.Form):
    name = forms.CharField(label='Nom', max_length=100, min_length=3, required=True)
    email = forms.EmailField(label='Email', max_length=100, min_length=3, required=True)
    subject = forms.CharField(label='Sujet', max_length=200, min_length=5, required=True)
    message = forms.CharField(widget=forms.Textarea, label='Message', min_length=10, required=True)

    def send_email(self):
        send_mail(
            subject=self.cleaned_data['subject'],
            message=self.cleaned_data['message'],
            from_email=self.cleaned_data['email'],
            recipient_list=env('EMAIL_RECIPIENT_LIST')
        )
        pass
