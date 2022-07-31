from rest_framework import serializers
from bootcampStudentRelations.models import BootcampStudentRelation


class BootcampStudentRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BootcampStudentRelation
        fields = '__all__'
        depth = 1
