from django.forms import ModelForm
from .models import Bid

class BidForm(ModelForm):
    class Meta:
        model = Bid
        fields=['bid_fio','bid_email','bid_about','bid_job','bid_from','bid_photo']
        
  
  
  
  
  
  
