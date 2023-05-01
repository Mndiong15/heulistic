from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

def create_account(request):
    if request.method == 'POST':
        # Get the form data
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        # Create the user
        user = User.objects.create_user(username=username, email=email, password=password)

        # Save the user to the database
        user.save()

        # Log the user in
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to a success page
            return HttpResponseRedirect('/success/')

    # Render the account creation form
    return render(request, 'create_account.html')
