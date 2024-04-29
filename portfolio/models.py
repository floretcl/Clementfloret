from django.db import models


class Icon(models.Model):
    name = models.CharField('nom', max_length=50)
    image = models.ImageField('image', upload_to='uploads/images/')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Icône'
        verbose_name_plural = 'Icônes'


class Skill(models.Model):
    name = models.CharField('nom', max_length=50)
    name_fr = models.CharField('nom fr', max_length=50)
    image = models.ForeignKey(Icon, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.PositiveSmallIntegerField("ordre d'apparition")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Compétence'
        verbose_name_plural = 'Compétences'


class PortfolioLink(models.Model):
    name = models.CharField('nom', max_length=50)
    name_fr = models.CharField('nom fr', max_length=50)
    image = models.ForeignKey(Icon, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.PositiveSmallIntegerField("ordre d'apparition")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Lien du portfolio'
        verbose_name_plural = 'Liens du portfolio'


class Portfolio(models.Model):
    name = models.CharField('nom', max_length=100)
    name_fr = models.CharField('nom fr', max_length=50)
    firstname = models.CharField('prénom', max_length=30)
    lastname = models.CharField('nom', max_length=30)
    job_title = models.CharField('titre de poste', max_length=50)
    job_title_fr = models.CharField('titre de poste fr', max_length=50)
    contact_email = models.EmailField('email de contact')
    about_description = models.CharField('description de la section à propos', max_length=500)
    about_description_fr = models.CharField('description de la section à propos fr', max_length=500)
    about_skill = models.ManyToManyField(Skill)
    about_link = models.ManyToManyField(PortfolioLink)
    resume = models.FileField('cv', upload_to='uploads/resume/')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Portfolio'
        verbose_name_plural = 'Portfolios'


class ProjectType(models.Model):
    name = models.CharField('nom', max_length=50)
    name_fr = models.CharField('nom fr', max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Type de projet'
        verbose_name_plural = 'Types de projets'


class Project(models.Model):
    name = models.CharField('nom', max_length=50)
    name_fr = models.CharField('nom fr', max_length=50)
    description = models.CharField('description du projet', max_length=500)
    description_fr = models.CharField('description du projet fr', max_length=500)
    skill = models.ManyToManyField(Skill)
    project_type = models.ForeignKey(ProjectType, on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField("ordre d'apparition")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Projet'
        verbose_name_plural = 'Projets'


class ProjectImage(models.Model):
    name = models.CharField('nom', max_length=50)
    image = models.ImageField('nom fr', upload_to='uploads/images/')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Image du projet'
        verbose_name_plural = 'Images du projet'


class ProjectLink(models.Model):
    name = models.CharField('nom', max_length=50)
    name_fr = models.CharField('nom fr', max_length=50)
    image = models.ForeignKey(Icon, on_delete=models.SET_NULL, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField("ordre d'apparition")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Lien'
        verbose_name_plural = 'Liens'
