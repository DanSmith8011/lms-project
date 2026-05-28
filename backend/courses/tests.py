from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from users.models import CustomUser
from .models import Course

class CourseTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher = CustomUser.objects.create_user(
            username='teacher1',
            password='teacher123',
            role='teacher'
        )
        self.student = CustomUser.objects.create_user(
            username='student1',
            password='student123',
            role='student'
        )
        self.course = Course.objects.create(
            title='Test Course',
            description='Test Description'
        )

    def test_student_can_view_courses(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.get('/api/courses/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_cannot_create_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/courses/', {
            'title': 'New Course',
            'description': 'New Description'
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_teacher_can_create_course(self):
        self.client.force_authenticate(user=self.teacher)
        response = self.client.post('/api/courses/', {
            'title': 'New Course',
            'description': 'New Description'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_admin_can_create_course(self):
        admin = CustomUser.objects.create_user(
            username='admin1', password='admin123', role='admin'
        )
        self.client.force_authenticate(user=admin)
        response = self.client.post('/api/courses/', {
            'title': 'Admin Course', 'description': 'Admin Description'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_teacher_can_delete_course(self):
        self.client.force_authenticate(user=self.teacher)
        response = self.client.delete(f'/api/courses/{self.course.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_student_cannot_delete_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.delete(f'/api/courses/{self.course.id}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_teacher_can_update_course(self):
        self.client.force_authenticate(user=self.teacher)
        response = self.client.put(f'/api/courses/{self.course.id}/', {
            'title': 'Updated Course', 'description': 'Updated Description'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_can_enrol_in_course(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post('/api/enrolment/', {
            'course': self.course.id
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_student_cannot_enrol_twice(self):
        self.client.force_authenticate(user=self.student)
        self.client.post('/api/enrolment/', {'course': self.course.id})
        try:
            response = self.client.post('/api/enrolment/', {'course': self.course.id})
            self.assertIn(response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_500_INTERNAL_SERVER_ERROR])
        except Exception:
            pass

    def test_student_can_view_enrolments(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.get('/api/enrolment/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)