"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="Student Dashboard",
      default_version='v1',
      description="Dashboard for Student data",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="learn@propulsionacademy.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True, # Set to False restrict access to protected endpoints
   permission_classes=(permissions.AllowAny,), # Permissions for docs access
)
from django.urls import path, include

BASE_URL = 'backend/'

urlpatterns = [
    # admin
    path(BASE_URL + 'admin/', admin.site.urls),
    # applications
    path(BASE_URL + 'api/applications/', include('applications.urls')),
    # bootcampLocations
    path(BASE_URL + 'api/locations/', include('bootcampLocations.urls')),
    # bootcamps
    path(BASE_URL + 'api/bootcamps/', include('bootcamps.urls')),
    # bootcampStudentRelations
    path(BASE_URL + 'api/studentRelations/', include('bootcampStudentRelations.urls')),
    # bootcampTypes
    path(BASE_URL + 'api/types/', include('bootcampTypes.urls')),
    # docs
    path(BASE_URL + 'api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
