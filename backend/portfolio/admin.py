from django.contrib import admin
from . import models


class ProjectLinkInline(admin.StackedInline):
    model = models.ProjectLink
    extra = 0


class ProjectImageInline(admin.StackedInline):
    model = models.ProjectImage
    extra = 0


class IconAdmin(admin.ModelAdmin):
    list_display = ['name', 'svg_file']
    list_per_page = 50
    ordering = ['name']
    search_fields = ['name']
    search_help_text = 'Recherche par nom'


class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'order']
    list_per_page = 50
    ordering = ['order']
    search_fields = ['name']
    search_help_text = 'Recherche par nom'


class PortfolioLinkAdmin(admin.ModelAdmin):
    list_display = ['name', 'url', 'order']
    list_per_page = 50
    ordering = ['order']
    search_fields = ['name']
    search_help_text = 'Recherche par nom'


class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_fr', 'job_title', 'job_title_fr', 'contact_email', 'resume', 'active']
    list_per_page = 50
    ordering = ['pk']
    search_fields = ['name', 'name_fr']
    search_help_text = 'Recherche par nom'


class ProjectTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_fr']
    list_per_page = 50
    ordering = ['pk']
    search_fields = ['name', 'name_fr']
    search_help_text = 'Recherche par nom'


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_fr', 'project_type', 'order']
    list_per_page = 50
    list_filter = ['project_type']
    ordering = ['order']
    search_fields = ['name', 'name_fr']
    search_help_text = 'Recherche par nom'
    inlines = [ProjectLinkInline, ProjectImageInline]


class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ['name', 'image', 'project']
    list_per_page = 50
    list_filter = ['project']
    ordering = ['pk']
    search_fields = ['name']
    search_help_text = 'Recherche par nom'


class ProjectLinkAdmin(admin.ModelAdmin):
    list_display = ['name', 'url', 'project', 'order']
    list_per_page = 50
    list_filter = ['project']
    ordering = ['project', 'order']
    search_fields = ['name', 'project']
    search_help_text = 'Recherche par nom ou par projet'


admin.site.register(models.Icon, IconAdmin)
admin.site.register(models.Skill, SkillAdmin)
admin.site.register(models.PortfolioLink, PortfolioLinkAdmin)
admin.site.register(models.Portfolio, PortfolioAdmin)
admin.site.register(models.ProjectType, ProjectTypeAdmin)
admin.site.register(models.Project, ProjectAdmin)
admin.site.register(models.ProjectImage, ProjectImageAdmin)
admin.site.register(models.ProjectLink, ProjectLinkAdmin)
