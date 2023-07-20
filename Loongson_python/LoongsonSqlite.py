import sqlite3
import tool
import json
import re
import ServerData
from time import sleep
from datetime import datetime

def connect_to_sqlite(database):
    conn = None
    try:
        conn = sqlite3.connect(database)
        print("成功连接到数据库！")
    except sqlite3.Error as e:
        print(e)

    return conn

def SqlDataToSqlite(NodeData):
    conn = connect_to_sqlite("/home/NodeDataLoongson.db")
    cur = conn.cursor()        #创建关联数据库的游标实例
    cur.execute("INSERT INTO node_message (node_id, temperature, humidity, light_intensity, carbon_dioxide, nitrogen, phosphorus, potassium, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", (NodeData[0], NodeData[1], NodeData[2], NodeData[3], NodeData[4], NodeData[5], NodeData[6], NodeData[7], tool.DeviceTime()))
    conn.commit()

    # 关闭连接
    conn.close()

def ReadSqliteData():
    conn = connect_to_sqlite("/home/NodeDataLoongson.db")
    cur = conn.cursor()        #创建关联数据库的游标实例
    cur.execute("SELECT * FROM instruct")
    rows = cur.fetchone()
    
    conn.commit()

    # 关闭连接
    conn.close()
    return rows


def compare_time(time_str1, time_str2):
    # 将时间字符串转换为datetime对象
    datetime1 = datetime.strptime(time_str1, "%Y-%m-%d %H:%M:%S")
    datetime2 = datetime.strptime(time_str2, "%Y-%m-%d %H:%M:%S")
    
    # 比较datetime对象
    if datetime1 < datetime2:
        return -1
    elif datetime1 == datetime2:
        return 0
    else:
        return 1


def run():
    print("sqlite和mysql数据定时刷新线程创建成功！")
    while True:
        sleep(3)
        InstructSqlite = ReadSqliteData()
        data_tuple = eval(str(InstructSqlite))
        json_data = json.dumps(data_tuple[1])

        DataServer = ServerData.SqlNodeInstructTime(data_tuple[0])
        ret = compare_time(str(data_tuple[3]), str(DataServer))
        Temp = []
        Temp.append(json_data[13])
        Temp.append(json_data[29])
        Temp.append(json_data[48])
        Temp.append(json_data[67])
        Temp.append(json_data[84])
        ServerData.SqliteInstructToServer(Temp)
