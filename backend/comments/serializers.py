from rest_framework  import serializers
from .models import Comments


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id','user', 'user_id','text','video_id','likes','dislikes']
        depth = 1
    user_id = serializers.IntegerField(write_only=True)

