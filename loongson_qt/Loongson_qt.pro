QT       += core gui
QT       += sql
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = Loongson_qt
TEMPLATE = app


SOURCES += main.cpp\
    Frame.cpp \
    LoongsonSqlite.cpp \
    SwitchButton.cpp \
    dialog.cpp

HEADERS  += \
    Frame.h \
    LoongsonSqlite.h \
    SwitchButton.h \
    dialog.h

FORMS    += \
    Frame.ui \
    dialog.ui
