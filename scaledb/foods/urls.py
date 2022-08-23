
from . import views
from rest_framework import routers
from django.urls import path

router = routers.DefaultRouter()

router.register('foods', views.FoodViewSet, basename='foods')
router.register('foodsUser', views.FoodViewSetUser, basename='foodsUser')
router.register('foodsAdmin', views.FoodViewSetAdmin, basename='foodsAdmin')

urlpatterns = [path('foodTest/', views.food_test)]
urlpatterns += router.urls