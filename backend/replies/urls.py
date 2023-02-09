from django.urls import path
from replies import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.video_replies),
    path('by_comment_id/<int:pk>/', views.user_replies),
]
