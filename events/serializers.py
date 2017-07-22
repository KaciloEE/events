from .models import Event, Bid
from rest_framework import serializers


class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('id','event_title','event_text','event_date', 'event_photo')


class BidSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bid        
        fields = ('id','bid_fio','bid_email','bid_about','bid_job', 'bid_date','bid_from','bid_photo','bid_event_id')        		