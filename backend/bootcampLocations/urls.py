from django.urls import path
from bootcampLocations.views import ListAllBootcampLocation

urlpatterns = [
    path('all/', ListAllBootcampLocation.as_view()),
]