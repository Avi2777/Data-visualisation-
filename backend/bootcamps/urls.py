from django.urls import path
from bootcamps.views import ListAllBootcamp, ListUpcomingBootcamp, RetrieveUpdateBootcamp

urlpatterns = [
    path('<int:pk>', RetrieveUpdateBootcamp.as_view()),
    path('all/', ListAllBootcamp.as_view()),
    path('upcoming/<int:num>', ListUpcomingBootcamp.as_view()),
]
