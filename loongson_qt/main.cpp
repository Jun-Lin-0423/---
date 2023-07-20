#include "Frame.h"
#include <QApplication>
#include <QTabWidget>
#include <QLabel>
#include "ui_Frame.h"
#include "LoongsonSqlite.h"
#include <QSqlDatabase>
#include <QSqlError>
#include <QSqlRecord>
int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    QSqlDatabase::removeDatabase("qt_sql_default_connection");
    QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE", "connection");
    db.setDatabaseName("/home/user/NodeDataLoongson.db");

    if (!db.open()) {
        qDebug() << "Failed to connect to database!";
    }

    QTabWidget tabWidget;
    QString result;

    QSqlQuery query(db);
    query.prepare("SELECT * FROM device_node where device_id = '71bb9d3c5e3156528c9c0d0aa6f2bcfd'");

    QSqlRecord record = query.record();
    int numColumns = record.count();
    int count = 0;
    FrameSwitchButtons* num[100];
    Ui::FrameSwitchButtons* ui_Main[100];
    while (query.next()) {
        QStringList rowData;
        QString Data;
        for (int i = 0; i < numColumns; i++) {
            rowData.append(query.value(i).toString());
            Data = query.value(i).toString();
        }
        num[++count] = new FrameSwitchButtons();
        ui_Main[count-1] = num[count-1]->getUi();
        num[count-1]->setNode(Data);
        ui_Main[count-1]->label_21->setText("节点ID："+Data);
        tabWidget.addTab(num[count-1],"节点"+QString::number(count));
        result = rowData.join(" ");
    }
    tabWidget.setTabPosition(QTabWidget::South);
    tabWidget.showFullScreen();
    return a.exec();
}
