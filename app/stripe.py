import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY_TEST

def create_customer(email):
    return stripe.Customer.create(email=email)

def create_subscription(customer_id, plan_id):
    return stripe.Subscription.create(
        customer=customer_id,
        items=[{"plan": plan_id}],
        expand=["latest_invoice.payment_intent"]
    )

def retrieve_subscription(subscription_id):
    return stripe.Subscription.retrieve(subscription_id)

def cancel_subscription(subscription_id):
    return stripe.Subscription.delete(subscription_id)
