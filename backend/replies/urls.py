from django.urls import path
from replies import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.video_replies),
    path('<str:video_id>/', views.user_replies),
]
