from rest_framework.generics import ListAPIView
from bootcampStudentRelations.models import BootcampStudentRelation
from bootcampStudentRelations.serializers import BootcampStudentRelationSerializer


class ListAllBootcampStudentRelations(ListAPIView):
    """
    get:
    Returns all the bootcamp student relations
    """
    queryset = BootcampStudentRelation.objects.all()
    permission_classes = []
    serializer_class = BootcampStudentRelationSerializer
