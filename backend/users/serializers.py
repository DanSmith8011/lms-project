from rest_frameword import serializers
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validate_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user