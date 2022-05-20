from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from sesh.models import Post, Area
from django.contrib.auth.models import User

class PostTests(APITestCase):
    def test_view_post(self):

        url = reverse('session_api:listcreate')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # def create_post(self):

    #     self.test_area = Area.objects.create(name = 'North London')

    #     self.testuser1 = User.objects.create_user(
    #         username = 'test_user1', password = '123456789')

    #     data = {"difficulty":'new', "time": 'new', "players_needed":'new', "description":'new', "player":1, "area":1}
    #     url = reverse('session_api:listcreate')
    #     response = self.client.post(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
