from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import stripe
import requests
import boto3
import tweepy

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
    

import boto3
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from django.conf import settings
from django.http import HttpResponse

def youtube_search(request):
    query = request.GET.get('q')
    if not query:
        return HttpResponse('No query specified')

    # Authenticate with Google API client using OAuth2 credentials
    credentials = google.oauth2.credentials.Credentials.from_authorized_user_info(
        request.session['google_auth_info'])

    # Initialize YouTube Data API client
    youtube = googleapiclient.discovery.build('youtube', 'v3', credentials=credentials)

    # Search for videos based on the user's query
    search_response = youtube.search().list(
        q=query,
        type='video',
        part='id,snippet',
        maxResults=100
    ).execute()

    # Upload each video to the corresponding user's S3 bucket
    s3 = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    for item in search_response['items']:
        video_id = item['id']['videoId']
        video_url = f'https://www.youtube.com/watch?v={video_id}'

        # Get the corresponding user's S3 bucket
        user_bucket_name = f'{request.user.username}-videos'
        user_bucket = s3.Bucket(user_bucket_name)

        # Upload the video to the user's S3 bucket
        response = s3.put_object(Bucket=user_bucket_name, Key=f'{video_id}.mp4', Body=video_url)

    return HttpResponse('Videos uploaded successfully')


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


def search_tweets(request):
    # Configure Twitter API client with app credentials and access token
    auth = tweepy.OAuthHandler(settings.TWITTER_API_KEY, settings.TWITTER_API_KEY_SECRET)
    auth.set_access_token(settings.TWITTER_ACCESS_TOKEN, settings.TWITTER_ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth)

    if request.method == 'POST':
        query = request.POST.get('query', '')
        search_results = api.search(q=query, count=10)
        tweets = []
        for result in search_results:
            # Extract relevant tweet data (e.g. text, user, engagement metrics)
            tweet = {
                'text': result.text,
                'retweets': result.retweet_count,
                'favorites': result.favorite_count,
                'url': f'https://twitter.com/{result.user.screen_name}/status/{result.id_str}'
            }
            tweets.append(tweet)
        return JsonResponse({'tweets': tweets})
