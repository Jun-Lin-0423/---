import ServerData
import json

def DataHancle(Data):
    data_json = json.dumps(Data)
    DataJson = json.loads(data_json)
    NodeData = []
    NodeData.append(DataJson["node_id"])
    NodeData.append(DataJson["temperature"])
    NodeData.append(DataJson["humidity"])
    NodeData.append(DataJson["light_intensity"])
    NodeData.append(DataJson["carbon_dioxide"])
    NodeData.append(DataJson["nitrogen"])
    NodeData.append(DataJson["phosphorus"])
    NodeData.append(DataJson["potassium"])
    NodeData.append(DataJson["node_power"])

    NodeData.append(str(eval(DataJson["instruct"])['LED']))
    NodeData.append(str(eval(DataJson["instruct"])['fan']))
    NodeData.append(str(eval(DataJson["instruct"])['relay1']))
    NodeData.append(str(eval(DataJson["instruct"])['relay2']))
    NodeData.append(str(eval(DataJson["instruct"])['mode']))

    ServerData.SqlDataToServer(NodeData)
    ServerData.SqlInstructToServer(NodeData)




