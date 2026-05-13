from django.db import models

class Register_Event(models.Model):
    name = models.CharField(max_length=20)
    category = models.CharField(max_length=50)
    price = models.CharField(max_length=20)
    e_date = models.DateField()
    mobilenumber = models.IntegerField()
    address = models.CharField(max_length=70)
    landmark = models.CharField(max_length=70)
    city = models.CharField(max_length=20)
    district = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    pincode = models.IntegerField()
    posted_on = models.DateTimeField(auto_now_add=True)

class Employee_Register(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    gender = models.CharField(max_length=10)
    dob = models.DateField()
    age = models.IntegerField()
    address = models.TextField()
    qualification = models.CharField(max_length=50)
    phone = models.IntegerField()
    alternumber = models.IntegerField()
    status = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    salary = models.IntegerField()
    join_date = models.DateField()
    
    def __str__(self):
        return self.name
    

class CreateEvent(models.Model):
    EVENT_TYPES = [
        ('birthday', 'Birthday'),
        ('babyshower', 'Babe Shower'),
        ('marriage', 'Marriage'),
        ('cultural', 'Cultural'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    image = models.URLField()
    price = models.IntegerField()
    offer_price = models.IntegerField()

    def __str__(self):
        return self.title


class Review(models.Model):
    EVENT_TYPES = [
        ("birthday", "Birthday"),
        ("babyshower", "Baby Shower"),
        ("marriage", "Marriage"),
        ("cultural", "Cultural"),
    ]

    reviewer_name = models.CharField(max_length=100)
    review_text = models.TextField()
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reviewer_name} - {self.event_type}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    reply_message = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"