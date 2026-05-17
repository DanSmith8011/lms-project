from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import CustomUser

class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_can_register(self):
        response = self.client.post('/api/users/register/', {
            'username': 'newuser',
            'email': 'new@test.com',
            'password': 'test123',
            'role': 'student'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_can_login(self):
        CustomUser.objects.create_user(
            username='testuser',
            password='test123',
            role='student'
        )
        response = self.client.post('/api/users/login/', {
            'username': 'testuser',
            'password': 'test123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

# Create your tests here.
