#ifndef FRAMESWITCHBUTTONS_H
#define FRAMESWITCHBUTTONS_H

#include <QWidget>
#include <QSqlDatabase>
namespace Ui {
class FrameSwitchButtons;
}

class FrameSwitchButtons : public QWidget
{
    Q_OBJECT

public:
    explicit FrameSwitchButtons(QWidget *parent = 0);
    ~FrameSwitchButtons();
    Ui::FrameSwitchButtons* getUi() const; // 返回ui成员指针
    QString Node;
    static QSqlDatabase database;
    void setNode(QString Node);
    void connectSqlite(const QString& connectionName);

private slots:
    void on_pushButton_clicked();

    void yourFunction();


    void on_switchBtn1_customContextMenuRequested(const QPoint &pos);

private:
    Ui::FrameSwitchButtons *ui;
};
#endif // FRAMESWITCHBUTTONS_H
