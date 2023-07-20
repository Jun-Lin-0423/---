#include "Frame.h"
#include "ui_Frame.h"
#include <dialog.h>
#include <QDebug>
#include <QTimer>
#include "LoongsonSqlite.h"
#include <QJsonDocument>
#include <QJsonObject>
#include <QDebug>

bool NodeArray[6];
FrameSwitchButtons::FrameSwitchButtons(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::FrameSwitchButtons)
{
    ui->setupUi(this);
    setWindowFlags(Qt::Window | Qt::FramelessWindowHint);
    showFullScreen();

}

QSqlDatabase FrameSwitchButtons::database = QSqlDatabase::addDatabase("QSQLITE");

void FrameSwitchButtons::connectSqlite(const QString& connectionName) {
    FrameSwitchButtons::database.setDatabaseName("/home/user/NodeDataLoongson.db");
    FrameSwitchButtons::database.setConnectOptions(connectionName);

    if (!FrameSwitchButtons::database.open()) {
        qDebug() << "Failed to connect to database!";
    } else {
        qDebug() << "Connected to database."<< connectionName;
    }

    QTimer* timer = new QTimer(this);
    connect(timer, &QTimer::timeout, this, &FrameSwitchButtons::yourFunction);
    int interval = 1000; // 1000毫秒 = 1秒
    timer->setInterval(interval);
    timer->start();

    this->ui->switchBtn1->setChecked(true);
    QString jsonString;
    if (1) {
        QString jsonString = queryTableData(FrameSwitchButtons::database,"instruct",this->Node);
        if(jsonString[25] == '1'){
            this->ui->switchBtn1->setChecked(true);
            NodeArray[0] = true;
        }else{
            this->ui->switchBtn1->setChecked(false);
            NodeArray[0] = false;
        }
        if(jsonString[35] == '1'){
            this->ui->switchBtn2->setChecked(true);
            NodeArray[1] = true;
        }else{
            this->ui->switchBtn2->setChecked(false);
            NodeArray[1] = false;
        }
        if(jsonString[48] == '1'){
            this->ui->switchBtn3->setChecked(true);
            NodeArray[2] = true;
        }else{
            this->ui->switchBtn3->setChecked(false);
            NodeArray[2] = false;
        }
        if(jsonString[61] == '1'){
            this->ui->switchBtn4->setChecked(true);
            NodeArray[3] = true;
        }else{
            this->ui->switchBtn4->setChecked(false);
            NodeArray[3] = false;
        }
        if(jsonString[72] == '1'){
            this->ui->switchBtn5->setChecked(true);
            NodeArray[4] = true;
        }else{
            this->ui->switchBtn5->setChecked(false);
            NodeArray[4] = false;
        }
            }
    QString String = queryTableData(FrameSwitchButtons::database,"node_message",this->Node);
    qDebug() << "node"<<String;

    QStringList parts = String.trimmed().split(" ");

    this->ui->label_9->setText(parts.at(1)+"  ℃");
    this->ui->label_11->setText(parts.at(2)+"  %RH");
    this->ui->label_12->setText(parts.at(4)+"  ppm");
    this->ui->label_10->setText(parts.at(3)+"  Lux");
    this->ui->label_19->setText(parts.at(5)+"  g/100 mL");
    this->ui->label_17->setText(parts.at(6)+"  g/100 mL");
    this->ui->label_20->setText(parts.at(7)+"  g/100 mL");
    this->ui->label_18->setText(parts.at(8)+"\n"+parts.at(9));


}

FrameSwitchButtons::~FrameSwitchButtons()
{
    delete ui;
}

void FrameSwitchButtons::on_pushButton_clicked()
{
    Dialog *a = new Dialog();
    a->show();
}

void FrameSwitchButtons::yourFunction()
{

    if (this->ui->switchBtn1->checked() != NodeArray[0]) {
        NodeArray[0] = this->ui->switchBtn1->checked();
        QString jsonString = NodeArreyhandle(NodeArray);

        updateData(FrameSwitchButtons::database,this->Node,jsonString);
        qDebug() << "switchBtn1";
    }
    if (this->ui->switchBtn2->checked() != NodeArray[1]) {
        NodeArray[1] = this->ui->switchBtn2->checked();
        QString jsonString = NodeArreyhandle(NodeArray);
        updateData(FrameSwitchButtons::database,this->Node,jsonString);
        qDebug() << "switchBtn2";
    }
    if (this->ui->switchBtn3->checked() != NodeArray[2]) {
        NodeArray[2] = this->ui->switchBtn3->checked();
        QString jsonString = NodeArreyhandle(NodeArray);
        updateData(FrameSwitchButtons::database,this->Node,jsonString);

        qDebug() << "switchBtn3";
    }
    if (this->ui->switchBtn4->checked() != NodeArray[3]) {
        NodeArray[3] = this->ui->switchBtn4->checked();
        QString jsonString = NodeArreyhandle(NodeArray);
        updateData(FrameSwitchButtons::database,this->Node,jsonString);

        qDebug() << "switchBtn4";
    }
    if (this->ui->switchBtn5->checked() != NodeArray[4]) {
        NodeArray[4] = this->ui->switchBtn5->checked();
        QString jsonString = NodeArreyhandle(NodeArray);
        updateData(FrameSwitchButtons::database,this->Node,jsonString);

        qDebug() << "switchBtn5";
    }
}

Ui::FrameSwitchButtons* FrameSwitchButtons::getUi() const
{
    return ui;
}
void FrameSwitchButtons::setNode(QString newNode){
    this->Node = newNode;
    connectSqlite(newNode);
    return;
}
