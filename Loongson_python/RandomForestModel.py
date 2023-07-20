import pickle
import json
import threading
import LoongSocket
import ServerData
from time import sleep

SendToServerQueue = LoongSocket.Queue()
SendToServerLock  = threading.Lock()
# 从文件中加载模型
with open('./modelMain.pkl', 'rb') as file:
    rf_model = pickle.load(file)

def run():
    while True:
        sleep(5)
        for i in range(len(LoongSocket.SensorNodeList)):
            InstructData = ServerData.SqlNodeInstruct(LoongSocket.SensorNodeList[i].NodeId)
            if int(InstructData[4]) == 1:
                if LoongSocket.SensorNodeList[i].NodeQueue.is_empty() == False:

                    LoongSocket.SensorNodeList[i].NodeLock.acquire()

                    Data = LoongSocket.SensorNodeList[i].NodeQueue.putqueue()

                    LoongSocket.SensorNodeList[i].NodeLock.release()
    
                    DataJson = json.loads(Data)
                    X = []
                    X.append(DataJson["temperature"])
                    X.append(DataJson["humidity"])
                    X.append(DataJson["light_intensity"])
                    X.append(DataJson["carbon_dioxide"])
                    X.append(DataJson["nitrogen"])
                    X.append(DataJson["phosphorus"])
                    X.append(DataJson["potassium"])

                    int_list = [int(x) for x in X]
   
                    int_list2 = []
                    int_list2.append(int_list)
                    predicts = rf_model.predict(int_list2)
                    instruct = {}
                    instructStr = {}
                    instruct['LED'] = int(predicts[0][0])
                    instruct['fan'] = int(predicts[0][1])
                    instruct['relay1'] = int(predicts[0][2])
                    instruct['relay2'] = int(predicts[0][3])
                    instruct['mode'] = int(1)
                    DataJson['instruct'] = json.dumps(instruct)

                    instructStr['LED'] = str(int(predicts[0][0]))
                    instructStr['fan'] = str(int(predicts[0][1]))
                    instructStr['relay1'] = str(int(predicts[0][2]))
                    instructStr['relay2'] = str(int(predicts[0][3]))
                    instructStr['mode'] = str(int(1))
        
                    LoongSocket.SensorNodeList[i].NodeInstructLock.acquire() 
                    
                    LoongSocket.SensorNodeList[i].NodeInstructQueue.pushqueue(instructStr)

                    LoongSocket.SensorNodeList[i].NodeInstructLock.release() 

    
                    SendToServerLock.acquire() 
                    
                    SendToServerQueue.pushqueue(DataJson)

                    SendToServerLock.release() 
            else:
                if LoongSocket.SensorNodeList[i].NodeQueue.is_empty() == False:

                    LoongSocket.SensorNodeList[i].NodeLock.acquire()

                    Data = LoongSocket.SensorNodeList[i].NodeQueue.putqueue()

                    LoongSocket.SensorNodeList[i].NodeLock.release()

                    DataJson = json.loads(Data)
                    X = []
                    X.append(DataJson["temperature"])
                    X.append(DataJson["humidity"])
                    X.append(DataJson["light_intensity"])
                    X.append(DataJson["carbon_dioxide"])
                    X.append(DataJson["nitrogen"])
                    X.append(DataJson["phosphorus"])
                    X.append(DataJson["potassium"])
                    instruct = {}
                    instructStr = {}

                    instruct['LED'] = int(InstructData[0])
                    instruct['fan'] = int(InstructData[1])
                    instruct['relay1'] = int(InstructData[2])
                    instruct['relay2'] = int(InstructData[3])
                    instruct['mode'] = int(0)
                    DataJson['instruct'] = json.dumps(instruct)

                    instructStr['LED'] = str(int(InstructData[0]))
                    instructStr['fan'] = str(int(InstructData[1]))
                    instructStr['relay1'] = str(int(InstructData[2]))
                    instructStr['relay2'] = str(int(InstructData[3]))
                    instructStr['mode'] = str(int(0))

                    LoongSocket.SensorNodeList[i].NodeInstructLock.acquire() 
                    
                    LoongSocket.SensorNodeList[i].NodeInstructQueue.pushqueue(instructStr)

                    LoongSocket.SensorNodeList[i].NodeInstructLock.release() 
            
                    SendToServerLock.acquire() 
                    
                    SendToServerQueue.pushqueue(DataJson)

                    SendToServerLock.release() 
