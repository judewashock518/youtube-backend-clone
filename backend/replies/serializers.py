from rest_framework  import serializers
from .models import Reply


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'user', 'comment','text','comment_id']
        depth = 1
    comment_id = serializers.IntegerField(write_only=True)