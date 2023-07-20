#include "LoongsonSqlite.h"
#include "Frame.h"
#include <QtSql>
bool connectToDatabase()
{
   FrameSwitchButtons::database.setDatabaseName("/home/user/NodeDataLoongson.db");

    if (!FrameSwitchButtons::database.open()) {
        qDebug() << "Failed to connect to database!";
        return false;
    }

    qDebug() << "Connected to database.";
    return true;
}



QString queryTableData(QSqlDatabase db,const QString& tableName, const QString& nodeId)
{
    qDebug() << "queryTableData"<<tableName<<nodeId;
    QString result;

    QSqlQuery query(db);
    query.prepare("SELECT * FROM " + tableName+" where node_id = '"+nodeId+"' order by id desc limit 1");

    if (!query.exec()) {
        qDebug() << "Failed to query table";
        return result;
    }

    QSqlRecord record = query.record();
    int numColumns = record.count();

    while (query.next()) {
        QStringList rowData;
        for (int i = 0; i < numColumns; i++) {
            rowData.append(query.value(i).toString());
        }
        result = rowData.join(" ");
    }
qDebug() <<result;
    return result;
}

QString queryNodeId(QSqlDatabase db, const QString& deviceId)
{
    QString result;

    QSqlQuery query(db);
    query.prepare("SELECT * FROM  device_node where device_id = '"+deviceId+"'");

    if (!query.exec()) {
        qDebug() << "Failed to query table";
        return result;
    }

    QSqlRecord record = query.record();
    int numColumns = record.count();

    while (query.next()) {
        QStringList rowData;
        for (int i = 0; i < numColumns; i++) {
            rowData.append(query.value(i).toString());
        }
        result = rowData.join(" ");
    }
    return result;
}

QString NodeArreyhandle(bool *arrey)
{
    QString jsonString = "{";
        if (arrey[0] == true)
        {
            jsonString += "\"LED\":\"1\",";
        }
        else
        {
            jsonString += "\"LED\":\"0\",";
        }
        if (arrey[1] == true)
        {
            jsonString += "\"fan\":\"1\",";
        }
        else
        {
            jsonString += "\"fan\":\"0\",";
        }
        if (arrey[2] == true)
        {
            jsonString += "\"relay1\":\"1\",";
        }
        else
        {
            jsonString += "\"relay1\":\"0\",";
        }
        if (arrey[3] == true)
        {
            jsonString += "\"relay2\":\"1\",";
        }
        else
        {
            jsonString += "\"relay2\":\"0\",";
        }
        if (arrey[4] == true)
        {
            jsonString += "\"mode\":\"1\"";
        }
        else
        {
            jsonString += "\"mode\":\"0\"";
        }
        jsonString += "}";

        qDebug() << "1111" << jsonString;
        return jsonString;
}

void updateData(QSqlDatabase db,const QString& nodeId, const QString& json)
{
    QDateTime currentDateTime = QDateTime::currentDateTime();

    QString timeString = currentDateTime.toString("yyyy-MM-dd hh:mm:ss");

    QSqlQuery query(db);
    query.prepare("update instruct set instruct = :New_instruct, time = :New_time where node_id = :id");
    query.bindValue(":id", nodeId);
    query.bindValue(":New_instruct", json);
    query.bindValue(":New_time", timeString);

    if (!query.exec()) {
        qDebug() << "Failed to insert data";
        return ;
    }

    qDebug() << "Data inserted successfully."<< timeString;
    return ;
}
