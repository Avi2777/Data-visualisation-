from rest_framework import serializers
from bootcampLocations.models import BootcampLocation


class BootcampLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BootcampLocation
        fields = '__all__'
        depth = 1