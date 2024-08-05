# Generated by Django 5.0.7 on 2024-08-02 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0004_portfolio_projects'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolio',
            name='project_types',
            field=models.ManyToManyField(to='portfolio.projecttype', verbose_name='types'),
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='projects',
            field=models.ManyToManyField(to='portfolio.project', verbose_name='projects'),
        ),
    ]