from django.conf.urls import url,include
from rest_framework import routers
from .views import IndexView, CreateBidView, BidsView, EventViewSet, BidViewSet, addNew


router = routers.DefaultRouter()
router.register(r'api-events', EventViewSet)
router.register(r'api-bids', BidViewSet)


urlpatterns = [
    url(r'^$', IndexView.as_view(), name="home"),    
    url(r'^(?P<pk>\d+)/$', CreateBidView.as_view(), name='details'),    
    url(r'^details/$', BidsView.as_view(), name="bids"),
    url(r'^post/$', addNew, name="new_bids"),
	url(r'^', include(router.urls)),
	
]
