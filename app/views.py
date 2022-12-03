from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# takes request and returns response
# request handler

def say_hello(request):
    return HttpResponse("Hello")