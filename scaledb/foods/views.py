from django.shortcuts import render

# Create your views here.

from .models import Food
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from .serializers import *
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q
from auth0authorization.views import get_user, requires_scope, requires_scope_request
from django.http import JsonResponse

# an API where any user can see foods created by "admin"
@permission_classes([AllowAny])
class FoodViewSet(ReadOnlyModelViewSet):
    serializer_class = FoodSerializer
    
    def get_queryset(self):
        return Food.objects.filter(created_by='admin')



# an API where any user can see foods created by "admin" or user
#but if method is not a safe method, the food item must be created by the user
@permission_classes([IsAuthenticated])
class FoodViewSetUser(ModelViewSet):
    serializer_class = FoodSerializer

    def update(self, request, *args, **kwargs):
        user = get_user(self.request)
        if self.get_object().created_by  == user:
        # if Food.objects.get(id = request.data['id']).created_by  == user:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(serializer.data)
        else:
            return Response(data="you do not have permission to update this food", status=status.HTTP_403_FORBIDDEN)


    def destroy(self, request, *args, **kwargs):
        print("request", request.data)
        instance = self.get_object()
        print("instance", instance)
        user = get_user(self.request)
        if instance.created_by == user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(data="you do not have permission to delete this food", status=status.HTTP_403_FORBIDDEN)




    def get_queryset(self):
        user = get_user(self.request)
        print("user:", user)
        my_q = Q(created_by = "admin") | Q(created_by = user)

        return Food.objects.filter(my_q)


@permission_classes([IsAuthenticated])

class FoodViewSetAdmin(ModelViewSet):
    serializer_class = FoodSerializer

    @requires_scope_request('edit:foods')
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @requires_scope_request('edit:foods')
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
        
    @requires_scope_request('edit:foods')
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


   # @requires_scope('edit:foods')
    #note not sure how to use this decorator.  May need to apply to all methods?
    def get_queryset(self):
        return Food.objects.all()

@api_view(['GET'])
@requires_scope('edit:foods')
def food_test(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated and have a scope of edit:foods to see this.'})


#an API where a user with admin scope can see foods created by "admin" or user
    #and can edit all foods created by admin or user