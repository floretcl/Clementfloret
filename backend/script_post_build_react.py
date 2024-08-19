#!/usr/bin/env python
import re


def convert_html_to_django_template(path_input, path_output):
    # Read html input file
    with open(path_input, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Replace static src url
    def replace_static_paths(match):
        # Get static path, in src or href
        file_path = match.group(1)
        # Delete '/static/' prefix
        relative_path = file_path.replace('/static/', '')
        # Re-make path with static template tag
        return '"{% static \'' + relative_path + '\' %}"'

    def replace_title(match):
        # Get html title tag
        html_title = match.group(1)
        # Delete html title tag, keep content
        title = html_title.replace('<title>', '')
        title = title.replace('</title>', '')
        # Re-make html title tag with {% block title %} template tag
        return '<title>{% block title %}' + title + '{% endblock %}</title>'

    # Add {% load static %} template tag on top of html file
    html_content = ("{% load i18n %}\n"
                    "{% get_available_languages as languages %}\n"
                    "{% get_current_language as LANGUAGE_CODE %}\n\n"
                    "{% load static %}\n\n") + html_content

    # Replace static paths by static template tag
    html_content = re.sub(
        r'<html lang="(.*?)">',
        '<html lang="{{ LANGUAGE_CODE }}">',
        html_content
    )

    html_content = re.sub(
        r'"/static/(.*?)"',
        replace_static_paths,
        html_content
    )

    # Replace html title by title with template tag
    html_content = re.sub(
        r'<title>(.*?)</title>',
        replace_title,
        html_content
    )

    # Replace html meta description by meta description with template tag
    html_content = re.sub(
        r'<meta name="description"((.|\n)*)content="((.|\n)*)"/>',
        '<meta name="description" ' +
        'content="{% block description %}{% translate \'meta_description\' %}{% endblock %}"/>',
        html_content
    )

    # Replace html scripts tags by {% block content %} template tag
    html_content = re.sub(
        r'<noscript>You need to enable JavaScript to run this app.</noscript>((.|\n)*)</body>',
        '<noscript>{% translate \'noscript_message\' %}</noscript>\n'
        '{% block content %}{% endblock %}\n</body>',
        html_content
    )

    # Add block template tag Ajouter les blocs de template Django pour meta et content
    html_content = html_content.replace('</head>', '    {% block meta %}{% endblock %}\n</head>', 1)

    # Écrire le contenu modifié dans un nouveau fichier base.html
    with open(path_output, 'w', encoding='utf-8') as file:
        file.write(html_content)


# Chemin vers votre fichier index.html d'origine
input_file_path = 'portfolio/static/portfolio/index.html'
# Chemin où vous voulez enregistrer le fichier base.html
output_file_path = 'portfolio/templates/portfolio/base.html'

# Appeler la fonction pour convertir le fichier
convert_html_to_django_template(input_file_path, output_file_path)

print("La conversion est terminée. Le fichier base.html a été créé.")
