from re import T
from django.shortcuts import render

# Create your views here.

from functools import wraps
import jwt

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .utils import jwt_decode_token


def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token


def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            print("token:", token)
            decoded = jwt_decode_token(token)
            print("decoded token", decoded)
            # decoded = jwt.decode(token, verify=False, algorithms=['RS256'])
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse(
                {'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope

def requires_scope_request(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope_request(f):
        @wraps(f)
        def decorated(request,*args, **kwargs):
            token = get_token_auth_header(args[0])
            print("token:", token)
            decoded = jwt_decode_token(token)
            print("decoded token", decoded)
            # decoded = jwt.decode(token, verify=False, algorithms=['RS256'])
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(request,*args, **kwargs)
            response = JsonResponse(
                {'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope_request


def get_user(request):
    token = get_token_auth_header(request)
    print("token:", token)
    decoded = jwt_decode_token(token)
    print("decoded token", decoded)
    # decoded = jwt.decode(token, verify=False, algorithms=['RS256'])
    if decoded.get("sub"):
        response = decoded["sub"]
    else:
        raise Exception("no sub info")
    return response


@api_view(['GET'])
@permission_classes([AllowAny])
def public(request):
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})


@api_view(['GET'])
def private(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated to see this.'})


@api_view(['GET'])
@requires_scope('read:messages')
def private_scoped(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'})
