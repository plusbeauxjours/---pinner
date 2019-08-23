release: python manage.py migrate --noinput
web: gunicorn --pythonpath django config.wsgi --log-file -
