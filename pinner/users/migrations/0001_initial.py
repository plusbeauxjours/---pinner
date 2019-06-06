# Generated by Django 2.2.2 on 2019-06-06 13:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('locations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('bio', models.TextField(blank=True, default='', null=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, choices=[('Masculine', 'Masculine'), ('Feminine', 'Feminine'), ('Genderqueer', 'Genderqueer')], max_length=15, null=True)),
                ('avatar', models.URLField(blank=True, default='http://basmed.unilag.edu.ng/wp-content/uploads/2018/10/avatar__181424.png')),
                ('phone_number', models.CharField(blank=True, max_length=20, null=True)),
                ('verified_phone_number', models.BooleanField(default=False)),
                ('verified_email', models.BooleanField(default=False)),
                ('email', models.EmailField(blank=True, max_length=50, null=True)),
                ('fbId', models.CharField(blank=True, max_length=20, null=True)),
                ('current_city', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='currentCity', to='locations.City')),
                ('nationality', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='nationality', to='locations.Country')),
                ('residence', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='residence', to='locations.Country')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
