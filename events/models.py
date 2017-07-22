from django.db import models

# Create your models here.
class Event(models.Model):
  class Meta:
    db_table = "events"

  event_title = models.CharField(max_length=200)
  event_text = models.TextField()
  event_date = models.DateTimeField()
  event_photo = models.ImageField(u"фотография", upload_to="events/photos", default="", blank=True)
  

class Bid(models.Model):
  class Meta:
    db_table = "bids"

  bid_fio = models.CharField(max_length=200)
  bid_email = models.CharField(max_length=200)
  bid_about = models.TextField(verbose_name="Немного о себе")
  bid_job = models.CharField(max_length=200)
  bid_date = models.DateTimeField(auto_now_add=True)  
  bid_event = models.ForeignKey(Event)
  bid_from = models.CharField(max_length=200)
  bid_photo = models.ImageField(u"фотография", upload_to="bids/photos", default="", blank=True)
