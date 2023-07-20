import socket
import json
import threading
socket.setdefaulttimeout(30)
# 创建一个服务端的 socket 对象
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.settimeout(30)
# 设置 IP 地址和端口号
host = '192.168.96.51'
port = 3333

# 传感器节点对象列表
SensorNodeList = []

# 绑定 IP 和端口号
server_socket.bind((host, port))

# 开始监听端口号
server_socket.listen(5)


class SensorNode:
    def __init__(self, NodeId, NodeSocket, NodePower):
        self.NodeId = NodeId
        self.NodeSocket = NodeSocket
        self.NodePower = NodePower
        self.NodeLock = threading.Lock()
        self.NodeInstructLock = threading.Lock()
        self.NodeDataHandleQueueLock = threading.Lock()
        self.NodeQueue = Queue()
        self.NodeInstructQueue = Queue()
        self.NodeDataHandleQueue = Queue()

def SocketDataNodeThread(NodeSocket,Node):
    SocketData = None
    while True:
        try:
            SocketData = NodeSocket.recv(1024)
        except :
            if SocketData == b"":
                NodeSocket.close()
            if Node in SensorNodeList:
                SensorNodeList.remove(Node)
                break    
        
        if Node.NodeInstructQueue.is_empty() == False:
            Node.NodeInstructLock.acquire() 

            instruct = Node.NodeInstructQueue.putqueue()

            Node.NodeInstructLock.release() 

            NodeSocket.send(str(instruct).encode())
        # 获取锁
        Node.NodeLock.acquire() 
        Node.NodeDataHandleQueueLock.acquire() 

        # 将数据写入队列
        Node.NodeQueue.pushqueue(SocketData.decode())
        Node.NodeDataHandleQueue.pushqueue(SocketData.decode())

        # 释放锁
        Node.NodeLock.release() 
        Node.NodeDataHandleQueueLock.release() 
        
   
def SocketThread():
    print("Socket监听线程创建成功！")
    while True:
        try:
            NodeSocket, addr = server_socket.accept()
            data = NodeSocket.recv(1024)
            DataJson = json.loads(data)

            Node = SensorNode(DataJson["node_id"], NodeSocket, DataJson["node_power"])
            SocketDataHancle = threading.Thread(target=SocketDataNodeThread, args=(NodeSocket,Node))
            SensorNodeList.append(Node)
            SocketDataHancle.start()
            print("有新的传感器节点建立Socke连接! 节点ID：",DataJson["node_id"])
        except:
            pass


class Queue(object):
	#初始化一个队列
    def __init__(self):
        self.__list = []

    # 入队
    def pushqueue(self,item):
        self.__list.append(item)

    # 出队
    def putqueue(self):
        return self.__list.pop(0)

    # 判断是否为空
    def is_empty(self):
        return self.__list == []

    # 判断长度
    def size(self):
        return len(self.__list)