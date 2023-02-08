from django.urls import path
from comments import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.video_comments),
    path('users/<str:video_id>/', views.user_comments),
]
