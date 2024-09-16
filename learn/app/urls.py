from django.urls import path
from .views import intex_test

urlpatterns = [
    path ('', intex_test, name='kaka')
]