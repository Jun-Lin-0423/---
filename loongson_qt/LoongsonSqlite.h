#ifndef LOONGSONSQLITE_H
#define LOONGSONSQLITE_H

#include <QSqlDatabase>
#include <QSqlError>
#include <QSqlQuery>
#include <QDebug>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QDateTime>

bool connectToDatabase();
QString queryTableData(QSqlDatabase db,const QString& tableName, const QString& nodeId);
QString queryNodeId(QSqlDatabase db, const QString& deviceId);
void updateData(QSqlDatabase db,const QString& nodeId, const QString& json);
QString NodeArreyhandle(bool *arrey);

#endif // LOONGSONSQLITE_H
