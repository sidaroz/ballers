from .views import PostList
from rest_framework.routers import DefaultRouter


app_name='session_api'

router = DefaultRouter()
router.register('', PostList, basename='post')
urlpatterns = router.urls
