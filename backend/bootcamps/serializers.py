from rest_framework import serializers

from applications.models import Application
from bootcamps.models import Bootcamp

from bootcampTypes.models import BootcampType

from bootcampLocations.models import BootcampLocation


class BootcampSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bootcamp
        fields = ('pk','name')
        depth = 1

class BootcamptypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BootcampType
        fields = ('name',)

class BootcampLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BootcampLocation
        fields = ('name',)

class BootcampAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bootcamp
        fields = ('name', 'bootcamp_type', 'bootcamp_location', 'early_apply_by', 'apply_by', 'start_date', 'end_date', 'is_part_time', 'active', 'is_in_person', 'is_remote')
        depth = 1

class ApplicationUpComingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('status',)


class BootcampUpComingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bootcamp
        fields = ('name', 'bootcamp_location', 'start_date', 'applications')
    applications = ApplicationUpComingSerializer(read_only=True, many=True)



