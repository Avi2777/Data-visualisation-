from rest_framework import serializers
from bootcampTypes.models import BootcampType


class BootcampTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BootcampType
        fields = '__all__'
        depth = 1
