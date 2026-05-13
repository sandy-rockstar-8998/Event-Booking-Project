import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *

@api_view(['GET'])
def hello_api(request):
    return Response({"message":"Hello form Django "})


@csrf_exempt
def registerEvent(request):
    if request.method == "GET":
        events = list(Register_Event.objects.values())
        return JsonResponse(events, safe=False)
    if request.method =='POST':
        data = json.loads(request.body)
        event = Register_Event.objects.create(**data)
        return JsonResponse({
            "message": "Created",
            "id": event.id
        })
    elif request.method == "PUT":
        data = json.loads(request.body)
        event_id = data.get("id")
        try:
            event = Register_Event.objects.get(id=event_id)
            event.name = data.get("name", "")
            event.category = data.get("category", "")
            event.price = data.get("price", "")
            event.e_date = data.get("e_date", "")
            event.mobilenumber = data.get("mobilenumber", "")
            event.address = data.get("address", "")
            event.landmark = data.get("landmark", "")
            event.district = data.get("district", "")
            event.state = data.get("state", "")
            event.city = data.get("city", "")
            event.pincode = data.get("pincode", "")
            event.save()
            return JsonResponse({"message": "Updated"})
        except Register_Event.DoesNotExist:
            return JsonResponse({"error":"Not found"}, status=404)

@csrf_exempt
def employee_reg(request):
    if request.method == "GET":
        employees = list(Employee_Register.objects.values())
        return JsonResponse(employees,safe=False)
    elif request.method == "POST":
        data = json.loads(request.body)
        emp = Employee_Register.objects.create(**data)
        return JsonResponse({
            "message": "Employee Created",
            "id": emp.id
        })
    elif request.method == "PUT":
        data = json.loads(request.body)
        emp_id = data.get("id")
        try:
            emp = Employee_Register.objects.get(id=emp_id)
            emp.name = data.get("name")
            emp.email = data.get("email")
            emp.phone = data.get("phone")
            emp.alternumber = data.get("alternumber")
            emp.gender = data.get("gender")
            emp.dob = data.get("dob")
            emp.age = data.get("age")
            emp.address = data.get("address")
            emp.qualification = data.get("qualification")
            emp.status = data.get("status")
            emp.department = data.get("department")
            emp.salary = data.get("salary")
            emp.join_date = data.get("join_date")
            emp.save()
            return JsonResponse({"message": "Updated"})
        except Employee_Register.DoesNotExist:
            return JsonResponse({"error":"Not found"}, status=404)
    elif request.method == "DELETE":
        data = json.loads(request.body)
        emp_id = data.get("id")
        try:
            emp = Employee_Register.objects.get(id=emp_id)
            emp.delete()
            return JsonResponse({"message":"Employee Deleted Successfully..."})
        except Employee_Register.DoesNotExist:
            return JsonResponse({"error":"Not found"}, status=404)
        

@csrf_exempt
def signup_page(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            if not username or not email or not password:
                return JsonResponse({"error":"All Fields Required.."}, status=400)
            
            if not Employee_Register.objects.filter(email=email).exists():
                return JsonResponse({"error":"This email is not a registered employee email."}, status=402)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists.."}, status=404)
            User.objects.create_user(
                username= username,
                email= email,
                password= password,
            )
            return JsonResponse ({"message": "User Created Successfully.."})
        except Exception as e:
            return JsonResponse({"error": str(e) }, status=500)
    return JsonResponse({"message": "Signup API working"})



@csrf_exempt
def login_page(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request,user)
            return JsonResponse({"message": "Login Successful...","username": user.username})
        else:
            return JsonResponse({"error": "Invalid Credentials..."}, status=400)


@csrf_exempt
def logout_page(request):
    logout(request)
    return JsonResponse ({"message": "Logged out Successfully..."})


@csrf_exempt
def create_event(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            CreateEvent.objects.create(
                title=data.get("title",""),
                description=data.get("description",""),
                event_type=data.get("event_type",""),
                price=int(data.get("price") or 0),
                offer_price=int(data.get("offer_price") or 0),
                image=data.get("image",""),
            )
            return JsonResponse({"message": "Created"})
        except Exception as e:
            print("error:",e)
            return JsonResponse({"error":str(e)}, status=500)
    
    
@csrf_exempt
def update_event(request, id):
    if request.method == "PUT":
        try:
            event = CreateEvent.objects.filter(id=id).first()
            data = json.loads(request.body)
            event.title=data.get("title",event.title)
            event.description=data.get("description",event.description)
            event.event_type=data.get("event_type",event.event_type)
            event.price=int(data.get("price") or 0)
            event.offer_price=int(data.get("offer_price") or 0)
            event.image=data.get("image",event.image)
            event.save()
            return JsonResponse({"message":"Updated Successfully.."})
        except CreateEvent.DoesNotExist:
            return JsonResponse({"error":"Event Not Found"}, status=404)
        except Exception as e:
            print("update error:", e)
            return JsonResponse({"error":str(e)}, status=500)
    return JsonResponse({"error":"Invaild method"}, status=400)

    
@csrf_exempt
def delete_event(request,id):
    if request.method == "DELETE":
        try:
            event= CreateEvent.objects.get(id=id)
            event.delete()
            return JsonResponse({"message":"Deleted Successfully"})
        except CreateEvent.DoesNotExist:
            return JsonResponse({"error":"Event Not Found"}, status=404)
        except Exception as e:
            return JsonResponse({"error":str(e)}, status=500)
    return JsonResponse({"error":"Invalid method"}, status=400)
    


def get_events(request):
    event_type = request.GET.get("type")
    if event_type:
        events =CreateEvent.objects.filter(event_type=event_type)
    else:
        events = CreateEvent.objects.all()
    data = list(events.values())
    return JsonResponse (data, safe=False)


@csrf_exempt
def reviews_api(request):
    if request.method == "GET":
        event_type = request.GET.get("event_type")
        reviews = Review.objects.all().order_by("-created_at")
        if event_type:
            reviews = reviews.filter(event_type=event_type)
        return JsonResponse(list(reviews.values()), safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            reviewer_name = data.get("reviewer_name", "").strip()
            review_text = data.get("review_text", "").strip()
            event_type = data.get("event_type", "").strip()

            if not reviewer_name or not review_text or not event_type:
                return JsonResponse({"error": "All fields are required"}, status=400)

            review = Review.objects.create(
                reviewer_name=reviewer_name,
                review_text=review_text,
                event_type=event_type,
            )
            return JsonResponse(
                {
                    "message": "Review created",
                    "id": review.id,
                },
                status=201,
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method"}, status=400)


@csrf_exempt
def contact_messages_api(request):
    if request.method == "GET":
        messages = ContactMessage.objects.all().order_by("-created_at")
        return JsonResponse(list(messages.values()), safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name", "").strip()
            email = data.get("email", "").strip()
            subject = data.get("subject", "").strip()
            message = data.get("message", "").strip()

            if not name or not email or not message:
                return JsonResponse({"error": "Name, email and message are required"}, status=400)

            contact_message = ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message,
            )
            return JsonResponse({"message": "Created", "id": contact_message.id}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            message_id = data.get("id")
            reply_message = data.get("reply_message", "").strip()
            if not message_id:
                return JsonResponse({"error": "id is required"}, status=400)

            contact_message = ContactMessage.objects.get(id=message_id)
            contact_message.reply_message = reply_message
            contact_message.save()
            return JsonResponse({"message": "Reply updated"})
        except ContactMessage.DoesNotExist:
            return JsonResponse({"error": "Message not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method"}, status=400)