from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, EnrolmentViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'enrolment', EnrolmentViewSet, basename='enrolment')
urlpatterns = [
    path('', include(router.urls))
]