from rest_framework import serializers
from applications.models import Application
from bootcampLocations.models import BootcampLocation
from bootcampTypes.models import BootcampType

from bootcamps.models import Bootcamp

class BootcampsLocationLatestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BootcampLocation
        fields = ('location',)

class ApplicationAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'


class BootcampsFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bootcamp
        fields = '__all__'
    bootcamp_location = BootcampsLocationLatestSerializer(read_only=True)

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('status', 'bootcamp',)

    bootcamp = BootcampsFilterSerializer(read_only=True)

class BootcampTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BootcampType
        fields = ('name',)

class BootcampsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bootcamp
        fields = ('name', 'start_date', 'bootcamp_location', 'bootcamp_type', 'is_part_time')

    bootcamp_location = BootcampsLocationLatestSerializer(read_only=True)
    bootcamp_type = BootcampTypeSerializer(read_only=True)


class LatestApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('id', 'first_name', 'last_name', 'bootcamp', 'status', 'applied', 'linkedin_profile',
                  'cv', 'personal_passed', 'technical_passed')
    bootcamp = BootcampsSerializer(read_only=True)

