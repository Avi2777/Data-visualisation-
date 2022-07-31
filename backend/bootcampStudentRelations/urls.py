from django.urls import path
from bootcampStudentRelations.views import ListAllBootcampStudentRelations

urlpatterns = [
    path('all/', ListAllBootcampStudentRelations.as_view()),
]
