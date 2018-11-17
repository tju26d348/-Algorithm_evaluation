import json
import datetime
from .models import ResultModel, DateEncoder
from pymysql import *


global mysql_ip
global mysql_port
global mysql_user
global mysql_password
global feedback_ip
mysql_ip = '127.0.0.1'
mysql_port = 3306
mysql_user = 'root'
mysql_password = 'root'
feedback_ip = "http://192.168.199.119:8000"


def get_authors():
    conn = connect(host=mysql_ip, port=mysql_port, user=mysql_user, passwd=mysql_password, db='m2ilab', charset='utf8')
    cursor = conn.cursor()
    sqlstr = 'select Author from methods where State=1'
    cursor.execute(sqlstr)
    result_dict = {}
    count = 0
    for result in cursor.fetchall():
        result_dict[count] = result
    print("----------------")
    jsondata = json.dumps(result_dict).replace('[','').replace(']','')
    print(jsondata)
    conn.commit()
    cursor.close()
    conn.close()
    return jsondata


def query_for_database():
    conn = connect(host=mysql_ip, port=mysql_port, user=mysql_user, passwd=mysql_password, db='m2ilab', charset='utf8')
    cursor = conn.cursor()
    sqlstr = 'SELECT data_base FROM m2ilab.methods group by data_base;'
    cursor.execute(sqlstr)
    database_list = []
    for result in cursor.fetchall():
        database_list.append(result[0])
    conn.commit()
    cursor.close()
    conn.close()
    return database_list


def get_database_messages(database):
    conn = connect(host=mysql_ip, port=mysql_port, user=mysql_user, passwd=mysql_password, db='m2ilab', charset='utf8')
    cursor = conn.cursor()
    sqlstr = 'select * from methods where data_base = %s and state = 1'
    cursor.execute(sqlstr, (str(database)))
    result_dict = {}
    count = 0
    for result in cursor.fetchall():
        one_result = ResultModel()
        one_result.id = result[0]
        one_result.name = result[1]
        one_result.method = result[2]
        one_result.MacroPresison = result[3]
        one_result.MacroRecall = result[4]
        one_result.MacroF1 = result[5]
        one_result.MacromAP = result[6]
        one_result.MacroNDCG = result[7]
        one_result.MicroPresion = result[8]
        one_result.MicroRecall = result[9]
        one_result.MicroF1 = result[10]
        one_result.MicromAP = result[11]
        one_result.MicroNDCG = result[12]
        one_result.Author = result[13]
        one_result.BeginTime = result[14]
        one_result.State = result[15]
        one_result.EndTime = result[16]
        one_result.PR_curve = result[17]
        one_result.count = result[18]
        one_result.count_now = result[19]
        one_result_dict = one_result.__dict__
        result_dict[count] = one_result_dict
        count += 1
    print("----------------")
    return result_dict


def query_for_list(id):
    conn = connect(host=mysql_ip, port=mysql_port, user=mysql_user, passwd=mysql_password, db='m2ilab', charset='utf8')
    cursor = conn.cursor()
    sqlstr = 'select method,Author,P_List,R_List from methods where id=%s;'
    print(sqlstr, (str(id),))
    cursor.execute(sqlstr, (str(id),))
    # sqlstr = 'select method,Author,P_List,R_List from Methods where id=' + id + ';'
    # print(sqlstr)
    # cursor.execute(sqlstr)
    precision_dict = {}
    recall_dict = {}
    for result in cursor.fetchall():
        method_name = result[0]
        author_name = result[1]
        p_list_str = result[2]
        r_list_str = result[3]
        precision_dict[method_name] = [float(x) for x in p_list_str.split(",")]
        recall_dict[method_name] = [float(x) for x in r_list_str.split(",")]
    conn.commit()
    cursor.close()
    conn.close()
    print(precision_dict)
    print(recall_dict)
    return precision_dict, recall_dict


def get_messages():
    conn = connect(host=mysql_ip, port=mysql_port, user=mysql_user, passwd=mysql_password, db='m2ilab', charset='utf8')
    cursor = conn.cursor()
    sqlstr = 'select * from methods'
    cursor.execute(sqlstr)
    #resultlist=[]
    result_dict = {}
    count = 0
    for result in cursor.fetchall():
        one_result = ResultModel()
        one_result.id = result[0]
        one_result.data_set = result[1]
        one_result.name = result[2]
        one_result.method = result[3]
        one_result.MacroPresison = result[4]
        one_result.MacroRecall = result[5]
        one_result.MacroF1 = result[6]
        one_result.MacromAP = result[7]
        one_result.MacroNDCG = result[8]
        one_result.MicroPresion = result[9]
        one_result.MicroRecall = result[10]
        one_result.MicroF1 = result[11]
        one_result.MicromAP = result[12]
        one_result.MicroNDCG = result[13]
        one_result.Author = result[14]
        one_result.BeginTime = result[15]
        one_result.State = result[16]
        one_result.EndTime = result[17]
        one_result.PR_curve = result[18]
        one_result.count = result[19]
        one_result.count_now = result[20]
        one_result_dict = one_result.__dict__
        result_dict[count] = one_result_dict
        count += 1
    print("----------------")
    jsondata = json.dumps(result_dict, cls=DateEncoder)
    conn.commit()
    cursor.close()
    conn.close()
    return jsondata


def get_done():
    conn = connect(host=mysql_ip, port=mysql_port, user=mysql_user, passwd=mysql_password, db='m2ilab', charset='utf8')
    cursor = conn.cursor()
    now = datetime.datetime.now()
    delta = datetime.timedelta(days=-1)
    n_days = now + delta
    n_days = n_days.strftime('%Y-%m-%d %H:%M:%S')
    sqlstr = 'select * from methods where State=1 and EndTime > "'+n_days+'";'
    print(sqlstr)
    cursor.execute(sqlstr)
    # resultlist=[]
    result_dict = {}
    count = 0
    for result in cursor.fetchall():
        one_result = ResultModel()
        one_result.id = result[0]
        one_result.name = result[1]
        one_result.method = result[2]
        one_result.MacroPresison = result[3]
        one_result.MacroRecall = result[4]
        one_result.MacroF1 = result[5]
        one_result.MacromAP = result[6]
        one_result.MacroNDCG = result[7]
        one_result.MicroPresion = result[8]
        one_result.MicroRecall = result[9]
        one_result.MicroF1 = result[10]
        one_result.MicromAP = result[11]
        one_result.MicroNDCG = result[12]
        one_result.Author = result[13]
        one_result.BeginTime = result[14]
        one_result.State = result[15]
        one_result.EndTime = result[16]
        one_result.PR_curve = result[17]
        one_result.count = result[18]
        one_result.count_now = result[19]
        one_result_dict = one_result.__dict__
        result_dict[count] = one_result_dict
        count += 1
    print("----------------")
    jsondata = json.dumps(result_dict, cls=DateEncoder)
    conn.commit()
    cursor.close()
    conn.close()
    return jsondata