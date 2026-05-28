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

    def test_admin_can_view_all_users(self):
        admin = CustomUser.objects.create_user(
            username='admin1', password='admin123', role='admin'
        )
        self.client.force_authenticate(user=admin)
        response = self.client.get('/api/users/all-users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_cannot_view_all_users(self):
        student = CustomUser.objects.create_user(
            username='student1', password='student123', role='student'
        )
        self.client.force_authenticate(user=student)
        response = self.client.get('/api/users/all-users/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_delete_user(self):
        admin = CustomUser.objects.create_user(
            username='admin1', password='admin123', role='admin'
        )
        user_to_delete = CustomUser.objects.create_user(
            username='todelete', password='test123', role='student'
        )
        self.client.force_authenticate(user=admin)
        response = self.client.delete(f'/api/users/all-users/{user_to_delete.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_unauthenticated_user_cannot_register_without_data(self):
        response = self.client.post('/api/users/register/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# Create your tests here.
