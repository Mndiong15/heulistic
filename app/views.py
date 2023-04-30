from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
import requests
import boto3

# Create your views here.
# takes request and returns response
# request handler for actions

def home(request):
    return render(request, 'App.js')

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
    

def youtube_search(request):
    query = request.GET.get('q') # Retrieve the search query from the request
    api_key = settings.GOOGLE_API_KEY # Your YouTube Data API key

    # Build the YouTube Data API request
    url = 'https://www.googleapis.com/youtube/v3/search'
    params = {
        'q': query,
        'part': 'snippet',
        'type': 'video',
        'videoDuration': 'short',
        'key': api_key
    }

    # Send the request to the YouTube Data API
    response = requests.get(url, params=params)
    videos = response.json()['items']

    # Now you can send the videos to AWS Rekognition for analysis


def upload_to_s3(request):
    # Retrieve the list of videos from the YouTube API
    api_key = "<your YouTube API key>"
    channel_id = "<your YouTube channel ID>"
    videos = get_youtube_videos(api_key, channel_id)

    # Upload the data to S3
    s3 = boto3.client("s3")
    bucket_name = "<your S3 bucket name>"
    key = "youtube_videos.json"
    s3.put_object(Bucket=bucket_name, Key=key, Body=str(videos))

    return HttpResponse("Data uploaded to S3!")
