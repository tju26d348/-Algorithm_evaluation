data = {'0':{'id':'1','Method':'MVCNN','Author':'dinghai02'},'1':{'id':'2','Method':'MVCNN','Author':'dinghai02'}}
index = []
for i in range(0, len(data)):
    index.append(int(data[str(i)]["id"]))
    print(index[i])
print(data)
