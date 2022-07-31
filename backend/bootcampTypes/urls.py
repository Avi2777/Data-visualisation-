from django.urls import path
from bootcampTypes.views import ListAllBootcampType

urlpatterns = [
    #backend/api/bootcamps/
    path('all/', ListAllBootcampType.as_view()),
]
