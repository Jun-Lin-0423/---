import LoongSocket
import json
import pickle
import ServerData
from time import sleep

with open('./modelMessage.pkl', 'rb') as fileMessage:
    rf_model_Message = pickle.load(fileMessage)

def DecisionMake():
    print("信息预测线程创建成功！")
    while True:
        sleep(3)
        for i in range(len(LoongSocket.SensorNodeList)):
            if LoongSocket.SensorNodeList[i].NodeDataHandleQueue.is_empty() == False:
                LoongSocket.SensorNodeList[i].NodeDataHandleQueueLock.acquire()

                Data = LoongSocket.SensorNodeList[i].NodeDataHandleQueue.putqueue()

                LoongSocket.SensorNodeList[i].NodeDataHandleQueueLock.release()

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
                predicts = rf_model_Message.predict(int_list2)
                ServerData.SqlNodeMessage(DataJson['node_id'],predicts[0])