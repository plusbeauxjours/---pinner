from django.contrib import admin
from . import models


@admin.register(models.Verification)
class Verifications(admin.ModelAdmin):
    pass
