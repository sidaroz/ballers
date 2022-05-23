from .views import PostList, PostListDetailfilter, PostDetail, PostDelete
from rest_framework.routers import DefaultRouter
from django.urls import path

app_name='session_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# router.register('search/', PostListDetailfilter, basename='postsearch')
# urlpatterns = router.urls

urlpatterns = [
  path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
  path('search/', PostListDetailfilter.as_view(), name='postsearch'),
  path('', PostList.as_view(), name='listcreate'),
  path('delete/<int:pk>/', PostDelete.as_view(), name='postdelete'),
]
