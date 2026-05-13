from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class RegisterEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register_Event
        fields ='__all__'

