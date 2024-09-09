from django.contrib import admin


class PortfolioAdminSite(admin.AdminSite):
    site_title = "Interface d'administration"
    site_header = "Portfolio | Interface d'administration"
    index_title = "Portfolio"
