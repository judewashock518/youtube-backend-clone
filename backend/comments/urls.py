from django.urls import path
from comments import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.video_comments),
    path('by_video_id/<str:video_id>/', views.user_comments),
    path('by_comment_id/<int:pk>/', views.update_comment),
]
