from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Job, Application

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name')

class JobSerializer(serializers.ModelSerializer):
    employer = UserSerializer(read_only=True)

    class Meta:
        model = Job
        fields = '__all__'

class JobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('title', 'description', 'location', 'employment_type')

class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    seeker = UserSerializer(read_only=True)

    class Meta:
        model = Application
        fields = '__all__'

class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('full_name', 'email', 'resume')

class ApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('status',)
