import json
import datetime
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponse
from rest_framework.parsers import JSONParser
from .models import DateEncoder
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .draw_pictures import drawing_pictures
from .database_operation import query_for_database, query_for_list, get_database_messages,get_messages
# Create your views here.


def get_method(request):
    return render(request, 'RealDemo01.html')


def say_hello(request):
    result = get_messages()
    print(result)
    return HttpResponse(result)


def get_undone(request):
    result = get_messages()
    # print(result)
    return HttpResponse(result)


def compare(request):
    if request.content_type != 'application/json':
        return HttpResponse('only support json data', status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
    if request.method == "POST":
        data = JSONParser().parse(request).values()
        content = {'msg': 'SUCCESS'}
        print("-----------")
        print(data)
        return JsonResponse(data=content, status=status.HTTP_200_OK)


def run_job(request):
    if request.content_type != 'application/json':
        return HttpResponse('only support json data', status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
        except Exception as why:
            print(why.args)
        else:
            content = {'msg': 'SUCCESS'}
            print(data)
            return JsonResponse(data=content, status=status.HTTP_200_OK)
    return HttpResponseNotAllowed(permitted_methods=['POST'])


class GetMessageView(APIView):
    def get(self, request):
        get = request.GET
        # 获取参数 a
        a = get.get('a')
        print(a)
        # 返回信息
        d = {
            'status': 1,
            'message': 'success',
            }
        print(d)
        return JsonResponse(d)


# 处理前端post的json数据
# {"0":{"id":"1","Method":"MVCNN","Author":"dinghai02"},"1":{"id":"2","Method":"MVCNN","Author":"dinghai02"}}
def process_post_json(request):
    if request.method == 'POST':
        # data = request.POST.get('data')
        data = request.body  # 要获取body中的json，一定要在请求头中加入content-type: applicaiton/json
        print(data)
        data = json.loads(data)
    else:
        return HttpResponse('use POST request method please')
    img_url = process_id(data)
    img_url = feedback_ip + img_url[5:]
    json_data = json.dumps(img_url)
    return HttpResponse(json_data, content_type="application/json")


# 前端传送的json转换为字典data
# data = {'0':{'id':'1','Method':'MVCNN','Author':'dinghai02'},'1':{'id':'2','Method':'MVCNN','Author':'dinghai02'}}
def process_id(data):
    precision_dict_res = {}
    recall_dict_res = {}
    for index in range(0, len(data)):
        id = int(data[str(index)]["id"])
        author = data[str(index)]["Author"]
        method = data[str(index)]["Method"]
        [precision_dict, recall_dict] = query_for_list(id)
        precision_dict_res.__setitem__(index, precision_dict)
        recall_dict_res.__setitem__(index, recall_dict)
    now = str(datetime.datetime.now().strftime('%Y-%m-%d-%H-%M-%S'))
    path_of_fig = "./api/static/api/img/img_ploted" + now + '.png'
    drawing_pictures(precision_dict_res, recall_dict_res, path_of_fig)
    return path_of_fig


def index(request):
    return render(request, "api/RealDemo01.html")


def database_group(request):
    database_group_dic = {}
    database_list = query_for_database()
    for database in database_list:
        database_group_dic.__setitem__(database, get_database_messages(database))
    json_data = json.dumps(database_group_dic, cls=DateEncoder)
    return HttpResponse(json_data, content_type="application/json")


# if __name__ == '__main__':
