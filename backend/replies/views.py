from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import ReplySerializer
from rest_framework import status
from .models import Reply

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def video_replies(request):
    comments = Reply.objects.all()
    serializer = ReplySerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # this makes sure the user is registered and logged in
def user_replies(request, comment_id):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        replies = Reply.objects.filter(comment=comment_id)
        serializer = ReplySerializer(replies, many=True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ReplySerializer(replies, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

