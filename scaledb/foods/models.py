from django.db import models

# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=100, null= False)
    created_by = models.CharField(max_length=100, null=False)
    points_per_gram = models.FloatField(null=False)