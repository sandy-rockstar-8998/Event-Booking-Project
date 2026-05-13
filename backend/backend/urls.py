"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path("hello/", hello_api),
    path("registerEvent/", registerEvent),
    path("employees/", employee_reg),
    path("signup/", signup_page),
    path("login/", login_page),
    path("logout/", logout_page),
    path("events/", get_events),
    path("events/<str:type>/", get_events),
    path("reviews/", reviews_api),
    path("contact-messages/", contact_messages_api),
    path("create-event/", create_event),
    path("update-event/<int:id>/", update_event),
    path("delete-event/<int:id>/", delete_event),
]
