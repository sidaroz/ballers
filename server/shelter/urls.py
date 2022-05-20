from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('sesh.urls', namespace='sesh')),
    path('api/', include('session_api.urls', namespace='session_api')),
]
