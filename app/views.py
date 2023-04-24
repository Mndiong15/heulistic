from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# takes request and returns response
# request handler for actions

def say_hello(request):
    return render(request, 'index.html')

def aboutUs(request):
    return render(request, 'About.js')