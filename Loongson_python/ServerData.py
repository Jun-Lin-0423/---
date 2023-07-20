import pymysql
import handle
import tool
import json
import LoongsonSqlite
import LoongSocket
from time import sleep
import RandomForestModel

host = 'localhost'
port = 3306
db = 'loongson'
user = 'root'
password = '7fwD79bY8MZf78QM'
NodeListServer = []
DeviceId = '71bb9d3c5e3156528c9c0d0aa6f2bcfd'


def get_connection():
    conn = pymysql.connect(host=host, port=port, db=db, user=user, password=password)
    return conn


def SqlNodeInstruct(node_id):
    conn = get_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    cursor.execute("select instruct from instruct where device_id = '"+DeviceId+"' and node_id = '"+node_id+"' order by id desc limit 1")
    Instruct = cursor.fetchone()
    data_json = json.dumps(Instruct)
    DataJson = json.loads(data_json)
    instruct = []
    instruct.append(eval(DataJson["instruct"])['LED'])
    instruct.append(eval(DataJson["instruct"])['fan'])
    instruct.append(eval(DataJson["instruct"])['relay1'])
    instruct.append(eval(DataJson["instruct"])['relay2'])
    instruct.append(eval(DataJson["instruct"])['mode'])
    cursor.close()
    conn.close()
    return instruct


def SqlNodeInstructTime(node_id):
    conn = get_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    cursor.execute("select instruct from instruct where device_id = '"+DeviceId+"' and node_id = '"+node_id+"' order by id desc limit 1")
    Instruct = cursor.fetchone()
    data_json = json.dumps(Instruct)
    DataJson = json.loads(data_json)
    instruct = []
    instruct.append(eval(DataJson["instruct"])['LED'])
    instruct.append(eval(DataJson["instruct"])['fan'])
    instruct.append(eval(DataJson["instruct"])['relay1'])
    instruct.append(eval(DataJson["instruct"])['relay2'])
    instruct.append(eval(DataJson["instruct"])['mode'])
    cursor.close()
    conn.close()
    return instruct


def SqlNodeRecv():
    NodeListServer.clear()
    conn = get_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    cursor.execute("select node_id from device_node where device_id = '"+DeviceId+"'")
    NodeList = cursor.fetchall()

    for Data in NodeList:
        NodeListServer.append(Data["node_id"])
    cursor.close()
    conn.close()


def SqlNodeOnline(NodeOnline):
    conn = get_connection()
    cursor = conn.cursor()

    updata_sql = "update device_node set node_online = 1 where node_id = '"+NodeOnline+"'"

    try:
        # 执行sql语句
        cursor.execute(updata_sql)
        # 提交到数据库执行
        conn.commit()
        cursor.execute(check_sql)
        # 查看表里所有数据
        data = cursor.fetchall()
    except:
        # 如果发生错误则回滚
        conn.rollback()

    # 关闭数据库连接
    cursor.close()
    conn.close()


def SqlNodeOffline(NodeOffline):
    conn = get_connection()
    cursor = conn.cursor()
    for node in NodeOffline:
        updata_sql = "update device_node set node_online = 0 where node_id = '"+node+"'"

        try:
            # 执行sql语句
            cursor.execute(updata_sql)
            # 提交到数据库执行
            conn.commit()
            cursor.execute(check_sql)
            # 查看表里所有数据
            data = cursor.fetchall()
            print(data)
        except:
            # 如果发生错误则回滚
            conn.rollback()

    # 关闭数据库连接
    cursor.close()
    conn.close()

def SqlNodeRes(Device_Id, NodeDetermine, NodePower):
    conn = get_connection()
    cursor = conn.cursor()
    sql = "insert into device_node(device_id, node_id, node_power, node_online) values('"+Device_Id+"', '"+NodeDetermine+"', '"+NodePower+"', 1"+")"

    cursor.execute(sql) 
    # 提交到数据库执行 
    conn.commit() 
    conn.close()

def SqlNodeMessage(node_id, message):
    conn = get_connection()
    cursor = conn.cursor()
    sql = "insert into information(device_id, node_id, content) values('"+DeviceId+"', '"+node_id+"', '"+message+"')"

    cursor.execute(sql) 
    # 提交到数据库执行 
    conn.commit() 
    conn.close()

def NodeDetermineExist():
    while True:
        sleep(3)
        SqlNodeRecv()
        NodeListServerOffline = NodeListServer
        print("当前在线设备：",LoongSocket.SensorNodeList)
        for SensorNode in LoongSocket.SensorNodeList:
            if SensorNode.NodeId in NodeListServer:
                SqlNodeOnline(SensorNode.NodeId)
                NodeListServerOffline.remove(SensorNode.NodeId)
            else :
                SqlNodeRes(DeviceId, str(SensorNode.NodeId), str(SensorNode.NodePower))
        SqlNodeOffline(NodeListServerOffline)
        print("在线设备刷新成功！")

def DeviceOnline(Devicetime):
    conn = get_connection()
    cursor = conn.cursor()

    updata_sql = "update user_device set online = '"+Devicetime+"' where device_id = '"+DeviceId+"'"

    try:
        # 执行sql语句
        cursor.execute(updata_sql)
        # 提交到数据库执行
        conn.commit()
        cursor.execute(check_sql)
        # 查看表里所有数据
        data = cursor.fetchall()
    except:
        # 如果发生错误则回滚
        conn.rollback()

    # 关闭数据库连接
    cursor.close()
    conn.close()


def SqlDataToServer(NodeData):
    print("发送节点数据 ",NodeData," 到云端")
    conn = get_connection()
    cursor = conn.cursor()

    sql = "insert into node_message(node_id, temperature, humidity, light_intensity, carbon_dioxide, nitrogen, phosphorus, potassium, time) values('"+NodeData[0]+"', '"+NodeData[1]+"', '"+NodeData[2]+"', '"+NodeData[3]+"', '"+NodeData[4]+"', '"+NodeData[5]+"', '"+NodeData[6]+"', '"+NodeData[7]+"', '"+tool.DeviceTime()+"')"
    try:
        cursor.execute(sql) 
        # 提交到数据库执行 
        conn.commit() 
    except:
        conn.rollback()
    LoongsonSqlite.SqlDataToSqlite(NodeData)
    conn.close()

def SqlInstructToServer(NodeInstruct):
    conn = get_connection()
    cursor = conn.cursor()
    Instruct = {}

    Instruct['LED'] = str(NodeInstruct[9])
    Instruct['fan'] = str(NodeInstruct[10])
    Instruct['relay1'] = str(NodeInstruct[11])
    Instruct['relay2'] = str(NodeInstruct[12])
    Instruct['mode'] = str(NodeInstruct[13])
    InstructJson = json.dumps(Instruct)

    sql = "insert into instruct(device_id, node_id, instruct) values('"+DeviceId+"', '"+NodeInstruct[0]+"', '"+InstructJson+"')"

    cursor.execute(sql) 
    # 提交到数据库执行 
    conn.commit() 
    conn.close()

def SqliteInstructToServer(NodeInstruct):
    conn = get_connection()
    cursor = conn.cursor()
    Instruct = {}

    Instruct['LED'] = str(NodeInstruct[0])
    Instruct['fan'] = str(NodeInstruct[1])
    Instruct['relay1'] = str(NodeInstruct[2])
    Instruct['relay2'] = str(NodeInstruct[3])
    Instruct['mode'] = str(NodeInstruct[4])
    InstructJson = json.dumps(Instruct)

    sql = "insert into instruct(device_id, node_id, instruct) values('"+DeviceId+"', '"+NodeInstruct[0]+"', '"+InstructJson+"')"

    cursor.execute(sql) 
    # 提交到数据库执行 
    conn.commit() 
    conn.close()

def DataSendToServer():
    print("节点数据发送云端线程创建成功！")
    while True:
        if RandomForestModel.SendToServerQueue.is_empty() == False:
            RandomForestModel.SendToServerLock.acquire()

            DataSend = RandomForestModel.SendToServerQueue.putqueue()

            RandomForestModel.SendToServerLock.release()

            handle.DataHancle(DataSend)
        sleep(1)


def SqlNodeSelect(nodeId):
    conn = get_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("select node_id from device_node where node_id = '"+nodeId+"'")
    NodeList = cursor.fetchone()

    if NodeList == None:
        return False
    else:
        return True

    cursor.close()
    conn.close()
