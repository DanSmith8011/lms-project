from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, UserListView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('all-users/', UserListView.as_view(), name='user-list'),
]
