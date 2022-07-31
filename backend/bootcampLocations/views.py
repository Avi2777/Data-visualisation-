from rest_framework.generics import ListAPIView
from bootcampLocations.serializers import BootcampLocationSerializer
from bootcampLocations.models import BootcampLocation


class ListAllBootcampLocation(ListAPIView):
    """
    get:
    Returns all the bootcamp locations
    """
    queryset = BootcampLocation.objects.all()
    permission_classes = []
    serializer_class = BootcampLocationSerializer
