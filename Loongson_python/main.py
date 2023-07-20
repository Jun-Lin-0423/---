import threading
import LoongSocket
import ServerData
import NodeMessage
import tool
import RandomForestModel
import LoongsonSqlite
from time import sleep


def main():
    print("设备在线刷新线程创建成功！")
    while True:
        print(tool.DeviceTime())
        ServerData.DeviceOnline(tool.DeviceTime())
        print("刷新成功，当前设备时间为：",tool.DeviceTime())
        sleep(30)


loongMainThread      = threading.Thread(target=main, args=())
loongSqliteThread    = threading.Thread(target=LoongsonSqlite.run, args=())
loongDataSendThread  = threading.Thread(target=ServerData.DataSendToServer, args=()) 
loongMessageThread   = threading.Thread(target=NodeMessage.DecisionMake, args=())
LoongSocketThread    = threading.Thread(target=LoongSocket.SocketThread, args=())
LoongModelThread     = threading.Thread(target=RandomForestModel.run, args=())
LoongNodeOnlieThread = threading.Thread(target=ServerData.NodeDetermineExist, args=())



loongMainThread.start()
loongSqliteThread.start()
loongDataSendThread.start()
loongMessageThread.start()
LoongSocketThread.start()
LoongModelThread.start()
LoongNodeOnlieThread.start()

loongMainThread.join()
loongSqliteThread.join()
loongDataSendThread.join()
loongMessageThread.join()
LoongSocketThread.join()
LoongModelThread.join()
LoongNodeOnlieThread.join()
