from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Area(models.Model):
    options = (
        ('North London', 'North London'),
        ('West London', 'West London'),
        ('South London', 'South London'),
        ('East London', 'East London')
    )
    name = models.CharField(choices=options, max_length=50)

    def __str__(self):
        return self.name


class Post(models.Model):

    options = (
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced')
    )
    area = models.ForeignKey(
        Area, on_delete=models.PROTECT, default=1)
    difficulty = models.CharField(max_length=50, choices=options, default='Beginner')
    time = models.CharField(max_length=5)
    players_needed = models.CharField(max_length=1)
    description = models.TextField(unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    player = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sesh_post'
    )

    class Meta:
        ordering = ('-published' ,)

    def __str__(self):
        return self.time

