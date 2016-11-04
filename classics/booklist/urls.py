from django.conf.urls import url

from . import views

app_name = 'booklist'
urlpatterns = [
    url(r'^$', views.menu, name='menu'),
]
