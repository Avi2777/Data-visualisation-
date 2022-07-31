from rest_framework.generics import ListAPIView, GenericAPIView, RetrieveUpdateAPIView
from datetime import datetime
from rest_framework.response import Response

from applications.models import Application
from bootcamps.models import Bootcamp
from bootcamps.serializers import BootcampSerializer, BootcampUpComingSerializer, BootcampAllSerializer
from rest_framework.views import APIView


class ListAllBootcamp(ListAPIView):
    """
    get:
    Returns all bootcamps
    """
    queryset = Bootcamp.objects.all()
    permission_classes = []
    serializer_class = BootcampSerializer

class RetrieveUpdateBootcamp(RetrieveUpdateAPIView):
    """
    get:
    returns bootcamp by ID
    """
    queryset = Bootcamp.objects.all()
    permission_classes = []
    authentication_classes = []
    serializer_class = BootcampAllSerializer
    lookup_field = 'pk'

class ListUpcomingBootcamp(APIView):
    """
    get:
    lists upcoming Bootcamps with sums of applications total and statuses
    """
    authentication_classes = []
    def get(self, request, *args, **kwargs):
        today = datetime.now().date()
        queryset = Bootcamp.objects.filter(start_date__gt=today).order_by('start_date')[:kwargs.get('num')]
        response = []

        #preparing the bootcamp-objects in response
        for entry in range(len(queryset)):
            response_element = {
                'id': queryset[entry].pk,
                'name': queryset[entry].name,
                'start_date': queryset[entry].start_date,
                'bootcamp_location': queryset[entry].bootcamp_location.location,
                'applications': {
                    'serious': 0,
                    'not_serious': 0,
                    'accepted': 0,
                    'enrolled': 0,
                    'to_review': 0,
                    'dropped_out': 0,
                    'else': 0,
                    'total': 0,
                }
            }

            # filtering applications for bootcamps and iterating through them, checking and summing up statuses
            applications = Application.objects.filter(bootcamp=queryset[entry].pk)
            num_applications = len(applications)
            response_element['applications']['total'] = num_applications

            #summing up
            for application_entry in range(num_applications):
                match applications[application_entry].status:
                    case 'serious':
                        response_element['applications']['serious'] += 1
                    case 'not_serious':
                        response_element['applications']['not_serious'] += 1
                    case 'enrolled':
                        response_element['applications']['enrolled'] += 1
                    case 'dropped_out':
                        response_element['applications']['dropped_out'] += 1
                    case 'graduated':
                        response_element['applications']['else'] += 1
                    case 'found_job':
                        response_element['applications']['else'] += 1
                    case _:
                        response_element['applications']['to_review'] += 1

            response.append(response_element)

        return Response(response)

    def post(self, request, *args, **kwargs):

        # setting up and filtering
        today = datetime.now().date()
        queryset = Bootcamp.objects.all()
        if request.data.get('include_past') != 'True':
            queryset = queryset.filter(start_date__gt=today).order_by('start_date')

        if request.data.get('bootcamp_type') is not None:
            queryset = queryset.filter(bootcamp_type=request.data['bootcamp_type'])
        if request.data.get('start_date') is not None:
            queryset = queryset.filter(start_date__gt=request.data['start_date'])
        if request.data.get('bootcamp_location') is not None:
            queryset = queryset.filter(bootcamp_location=request.data['bootcamp_location'])

        queryset = queryset.order_by('start_date')[:kwargs.get('num')]

        response = []
        # preparing the bootcamp-objects in response
        for entry in range(len(queryset)):
            response_element = {
                'id': queryset[entry].pk,
                'name': queryset[entry].name,
                'start_date': queryset[entry].start_date,
                'bootcamp_location': queryset[entry].bootcamp_location.location,
                'applications': {
                    'serious': 0,
                    'not_serious': 0,
                    'accepted': 0,
                    'enrolled': 0,
                    'to_review': 0,
                    'dropped_out': 0,
                    'else': 0,
                    'total': 0,
                }
            }

            # filtering applications for bootcamps and iterating through them, checking and summing up statuses
            applications = Application.objects.filter(bootcamp=queryset[entry].pk)
            num_applications = len(applications)
            response_element['applications']['total'] = num_applications

            # summing up
            for application_entry in range(num_applications):
                match applications[application_entry].status:
                    case 'serious':
                        response_element['applications']['serious'] += 1
                    case 'not_serious':
                        response_element['applications']['not_serious'] += 1
                    case 'enrolled':
                        response_element['applications']['enrolled'] += 1
                    case 'dropped_out':
                        response_element['applications']['dropped_out'] += 1
                    case 'graduated':
                        response_element['applications']['else'] += 1
                    case 'found_job':
                        response_element['applications']['else'] += 1
                    case _:
                        response_element['applications']['to_review'] += 1

            response.append(response_element)

        return Response(response)




