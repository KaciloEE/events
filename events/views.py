from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.views.generic import ListView, View
from rest_framework import viewsets
from .serializers import EventSerializer, BidSerializer
from .forms import BidForm
from .models import Bid, Event
from django.views.decorators.csrf import csrf_exempt



# Create your views here.
class IndexView(ListView):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):        
        data = {'data': Event.objects.all()}
        return render(request, self.template_name, data)

class CreateBidView(View):
    template_name = 'details.html'
    form_class = BidForm
    model = Event

    def get(self, request, pk):
        form = self.form_class()        
        return render(request, self.template_name, {'form': form, 'object':Event.objects.get(id=pk) })

    def post(self, request, pk):
        form = self.form_class(request.POST, request.FILES)
        if form.is_valid():
            bid = form.save(commit=False)
            bid.bid_event = Event.objects.get(id=pk)            
            form.save()
            return HttpResponseRedirect('/')
        return render(request, self.template_name, {'form': form, 'object':Event.objects.get(id=pk)})


class BidsView(ListView):
    template_name = 'bids.html'

    def get(self, request, *args, **kwargs):        
        data = {'data': Bid.objects.all()}
        return render(request, self.template_name, data)    
		


class EventViewSet(viewsets.ModelViewSet):    
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class BidViewSet(viewsets.ModelViewSet):    
    queryset = Bid.objects.all()
    serializer_class = BidSerializer    

@csrf_exempt
def addNew(request):                  
    Bid.objects.create(
        bid_fio = request.POST['bid_fio'],
        bid_email = request.POST['bid_email'],
        bid_about = request.POST['bid_about'],
        bid_job = request.POST['bid_job'],        
        bid_event_id = request.POST['bid_event'],
        bid_from = request.POST['bid_from'],
        bid_photo = request.FILES['bid_photo']
    )
    return JsonResponse({'status': '200'})