from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    location = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    attendees = models.IntegerField()
    ticket_price = models.FloatField()
    past_attendance = models.IntegerField()
    popularity = models.CharField(max_length=50, blank=True, null=True)
