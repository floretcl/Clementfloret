from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(label='Nom', max_length=100, min_length=3, required=True)
    email = forms.EmailField(label='Email', max_length=100, min_length=3, required=True)
    subject = forms.CharField(label='Sujet', max_length=200, min_length=5, required=True)
    message = forms.CharField(widget=forms.Textarea, label='Message', min_length=10, required=True)
