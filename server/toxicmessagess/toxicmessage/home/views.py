from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
import nltk
nltk.download('punkt')

from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

from .detection import CyberbullyingDetector


@csrf_exempt
def userRegistration(request):

    data = json.loads(request.body)

    user = User.objects.create_user(**data)
    return JsonResponse({'status': 200, 'user': {

        'id': user.id,
                    'name': user.first_name,
                    'email': user.username,
                    'date': user.date_joined, 
                    'password': user.password,          
                }})

@csrf_exempt
def userLogin(request):

    data = json.loads(request.body)
    user = authenticate(request, **data)
    print(user)
    if user is not None:
        login(request, user) 
        return JsonResponse({'status': 200, 'user': {
                    'id': user.id,
                   'name': user.first_name,
                    'email': user.username,
                    'date': user.date_joined, 
                    'password': user.password,
                }})
    else:
        return JsonResponse({'status':401})
    

@csrf_exempt
def memberSelect(request):
    if request.method == 'GET':
        try:           
            groupmembers = User.objects.values('id', 'first_name')
            return JsonResponse(list(groupmembers), safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)



@csrf_exempt
def addGroups(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            group_name = json_data['group_name']
            group_member_ids = json_data['group_member']  
            admin = User.objects.get(pk=json_data['admin'])

            
            group = Group.objects.create(group_name=group_name,admin=admin)

            member_names_list = json.loads(group_member_ids)

            for userid in member_names_list:
                 user = User.objects.get(pk=userid)
                 GroupMembers.objects.create(member=user,group=group)



            
            # for member in group_members:
            #     group.member_name.add(member)

            return JsonResponse({'message': 'group added successfully'}, status=200)
        except KeyError as e:
            return JsonResponse({'error': f'Missing required field: {e}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'Failed to add group: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    

    
@csrf_exempt
def userGroupchat(request):

    data = json.loads(request.body)

    user = User.objects.create(**data)
    return JsonResponse({'status': 200})

    
@csrf_exempt
def findUserGroups(request):
    data = json.loads(request.body)

    user = User.objects.get(pk=data['userid'])
    user_groups = GroupMembers.objects.filter(member=user) 
    # user_groups_data = list(user_groups.values())
    user_groups_data = []
    for group_member in user_groups:
        group_data = {
            'group_name': group_member.group.group_name,
            'id':group_member.group.id 
        }
        user_groups_data.append(group_data)

    print(user_groups_data)
    return JsonResponse({'status': 200,'usergroups':user_groups_data})

@csrf_exempt
def saveUserChat(request):
    data = json.loads(request.body)

    user = User.objects.get(pk=data['member'])
    group = Group.objects.get(pk=data['group'])
    message = data['message']
     
    is_toxic = getPrediction(request,data['message']) 
    Userchat.objects.create(name=user,group_name=group,message=message,is_toxic=is_toxic)
    return JsonResponse({'status': 200})


@csrf_exempt
def getUserChat(request):

    data = json.loads(request.body)
    user = User.objects.get(pk=data['member'])
    group = Group.objects.get(pk=data['groupid'])
    chats = Userchat.objects.filter(group_name=group) 

    chatdata = []
    for chat in chats:
        if chat.name.id==data['member']:
            is_sender = 1
        else:
            is_sender = 0
        chatin = {
            'created':chat.created,
            'message':chat.message,
            'name':chat.name.first_name,
            'is_sender':is_sender,
            'is_toxic':chat.is_toxic,
            'admin':chat.group_name.admin.id   
        }
        chatdata.append(chatin)
        
    return JsonResponse({'group':chatdata})  


def getPrediction(request,text):
      
    new_detector = CyberbullyingDetector()
    new_detector.load_model(r"E:\Logiprompt_Works_Nimal\Work_projects\Work_projects_Code\Colleges\Lourdes\Ramsiya\toxicmsg\server\toxicmessagess\toxicmessage\home\cyberbullying_model.joblib")
 
    prediction = new_detector.predict(text)[0] 
    serializable_list = prediction.tolist()
    return serializable_list