from rest_framework import serializers
from sesh.models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'area', 'difficulty', 'time', 'players_needed', 'description', 'player')
