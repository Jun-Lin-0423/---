import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# 读取表格数据
data = pd.read_excel('./data.xlsx')

# 提取输入和输出值
X = data[['温度', '湿度', '光强', '二氧化碳', '氮', '磷', '钾']]
y = data[['灯', '风扇', '继电器1', '继电器2']]

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 创建随机森林分类器
rf = RandomForestClassifier()

# 训练模型
rf.fit(X_train, y_train)

# 将训练好的模型保存到文件
with open('./model.pkl', 'wb') as file:
    pickle.dump(rf, file)