from django.core.validators import URLValidator
from django.db import models


class Icon(models.Model):
    name = models.CharField('nom', max_length=50, unique=True)
    svg_file = models.FileField('fichier svg', upload_to='uploads/icons/')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Icône'
        verbose_name_plural = 'Icônes'


class Skill(models.Model):
    name = models.CharField('nom', max_length=50, unique=True)
    icon = models.ForeignKey(Icon, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='icône')
    order = models.PositiveSmallIntegerField("ordre d'apparition")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Compétence'
        verbose_name_plural = 'Compétences'


class PortfolioLink(models.Model):
    name = models.CharField('nom', max_length=50, unique=True)
    icon = models.ForeignKey(Icon, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='icône')
    url = models.CharField('lien', max_length=200)
    order = models.PositiveSmallIntegerField("ordre d'apparition")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Lien de portfolio'
        verbose_name_plural = 'Liens de portfolio'


class ProjectType(models.Model):
    name = models.CharField('nom', max_length=50, unique=True)
    name_fr = models.CharField('nom fr', max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Type de projet'
        verbose_name_plural = 'Types de projets'


class Project(models.Model):
    name = models.CharField('nom', max_length=50, unique=True)
    name_fr = models.CharField('nom fr', max_length=50)
    description = models.CharField('description du projet', max_length=500)
    description_fr = models.CharField('description du projet fr', max_length=500)
    skill = models.ManyToManyField(Skill, verbose_name='compétences')
    project_type = models.ForeignKey(ProjectType, on_delete=models.CASCADE, verbose_name='type de projet')
    order = models.PositiveSmallIntegerField("ordre d'apparition")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Projet'
        verbose_name_plural = 'Projets'


class ProjectImage(models.Model):
    name = models.CharField('nom', max_length=50)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='projet')
    image = models.ImageField('image', upload_to='uploads/images/')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Image de projet'
        verbose_name_plural = 'Images de projet'


class ProjectLink(models.Model):
    name = models.CharField('nom', max_length=50)
    icon = models.ForeignKey(Icon, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='icône')
    url = models.URLField('url', validators=[URLValidator(schemes=['http', 'https'])])
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='projet')
    order = models.PositiveSmallIntegerField("ordre d'apparition")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Lien de projet'
        verbose_name_plural = 'Liens de projet'


class Portfolio(models.Model):
    name = models.CharField('nom', max_length=100)
    name_fr = models.CharField('nom fr', max_length=100)
    firstname = models.CharField('prénom', max_length=30)
    lastname = models.CharField('nom', max_length=30)
    job_title = models.CharField('titre de poste', max_length=50)
    job_title_fr = models.CharField('titre de poste fr', max_length=50)
    contact_email = models.EmailField('email de contact')
    about_description = models.CharField('description de la section à propos', max_length=500)
    about_description_fr = models.CharField('description de la section à propos fr', max_length=500)
    about_skill = models.ManyToManyField(Skill, verbose_name='compétences')
    about_link = models.ManyToManyField(PortfolioLink, verbose_name='liens')
    project_types = models.ManyToManyField(ProjectType, verbose_name='types')
    projects = models.ManyToManyField(Project, verbose_name='projects')
    avatar = models.ImageField('avatar', upload_to='uploads/avatar')
    resume = models.FileField('cv', upload_to='uploads/resume/')
    active = models.BooleanField('actif', default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Portfolio'
        verbose_name_plural = 'Portfolios'
