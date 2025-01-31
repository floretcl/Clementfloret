# PORTFOLIO

## REQUIREMENTS

- Python 3
- Pip 
- MariaDB or MySQL
- Nodejs and NPM


## HOW TO

### FRONT

- `cd frontend/portfolio-react-app`
- `npm install`
- Run app preview`npm run preview`
- Run app : `npm run dev`
- Eslint`npm run lint`
- Build app : `npm run build`
- After build, create new base template for backend app : 
  - `cd ../../backend`
  - `./script_post_build_react.py`


### BACK

- Create new database and user :
  - `sudo mariadb`
  - `CREATE DATABASE portfolio;`
  - `GRANT *privileges* ON portfolio.* TO 'user'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;`
  - `FLUSH PRIVILEGES;`
  - `exit`
- Create virtual env : 
  - `cd backend`
  - `python3 -m venv .venv`
- Install pip requirements :
  - `source .venv/bin/activate`
  - `pip install --upgrade pip`
  - `pip install -r requirements.txt`
- Create .env file
  - `cd clementfloret`
  - `touch .env`
  - add these lines in .env file and modify values

```
DEBUG=True
ENV=DEV
SECRET_KEY=secret_key

DB_NAME=portfolio
DB_USER=admin
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306

EMAIL_HOST=localhost
EMAIL_PORT=8025
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_USE_TLS=
EMAIL_USE_LOCALTIME=True

ADMINS=[("username", "email")]
```
  
- Initialize database :
  - `cd ..`
  - `./manage.py migrate`
  - `./manage.py makemigrations`
  - `./manage.py migrate`
  - `./manage.py loaddata sample.json`
  
- Create new admin :
  - `./manage.py createsuperuser`
- Check project 
  - `./manage.py check`
- Check test
  - `.manage.py test`
- Run Django server :
  - `./manage.py runserver`
  - Web app : http://127.0.0.1:8000/
  - Django admin : http://127.0.0.1:8000/admin/
- Stop server with `ctrl+c`
- Close virtualenv :
  - `deactivate`


#### TEST EMAIL FOR DEVELOPMENT

- Start a "dumb" smtp server with aiosmtpd :
  - `python3 -m aiosmtpd -n -l localhost:8025`
  - aiosmtpd will receive emails locally and display them to the terminal
