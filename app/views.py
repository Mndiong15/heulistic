from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe

# Create your views here.
# takes request and returns response
# request handler for actions

def home(request):
    return render(request, 'index.js')

# get the about us page
def aboutUs(request):
    return render(request, 'About.js')

# this view will handle the Stripe subscription process

def subscription(request):
    if request.method == "POST":
        email = request.POST.get("email")
        plan_id = request.POST.get("plan")
        customer = stripe.create_customer(email)
        subscription = stripe.create_subscription(customer.id, plan_id)
        return redirect("home")
    else:
        return render(request, "Subscription.js")
    
