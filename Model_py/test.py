import joblib
import pandas as pd

# 加载模型
model = joblib.load('./model.pkl')

# 读取测试数据
test_data = pd.read_excel('./test.xlsx')

# 提取输入值
X_test = test_data[['温度', '湿度', '光强', '二氧化碳', '氮', '磷', '钾']]

# 使用模型进行预测
predictions = model.predict(X_test)

# 输出预测结果
print(predictions)