# Generated by Django 5.0.7 on 2024-08-02 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_portfolio_project_types'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='projects',
            field=models.ManyToManyField(blank=True, to='portfolio.project', verbose_name='projects'),
        ),
    ]
