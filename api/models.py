import json
import datetime
from django.db import models

# Create your models here.


class METHODS(models.Model):
    id = models.IntegerField(max_length=10,primary_key=True)
    name = models.CharField(max_length=30)
    method = models.CharField(max_length=30)
    MacroPresison = models.CharField(max_length=30)
    MacroRecall = models.CharField(max_length=30)
    MacroF1 = models.CharField(max_length=30)
    MacromAP = models.CharField(max_length=30)
    MacroNDCG = models.CharField(max_length=30)
    MicroPresion = models.CharField(max_length=30)
    MicroRecall = models.CharField(max_length=30)
    MicroF1 = models.CharField(max_length=30)
    MicromAP = models.CharField(max_length=30)
    MicroNDCG = models.CharField(max_length=30)
    Author = models.CharField(max_length=30)
    BeginTime = models.DateTimeField(max_length=30)
    State = models.IntegerField(max_length=10)
    EndTime = models.DateTimeField(max_length=30)
    PR_curve = models.CharField(max_length=50)
    count = models.IntegerField(max_length=30)
    count_now = models.IntegerField(max_length=30)


class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        else:
            return json.JSONEncoder.default(self, obj)


class ResultModel:
    pass
