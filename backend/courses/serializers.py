from rest_framework import serializers
from .models import Course, Enrolment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description']


class EnrolmentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Enrolment
        fields = ['id', 'user', 'course', 'enrolled_at']
        read_only_fields = ['user', 'enrolled_at']