#ifndef MAIN_UART_RS485_UARTRS485_H_
#define MAIN_UART_RS485_UARTRS485_H_


#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "nvs_flash.h"
#include "driver/uart.h"
#include "freertos/queue.h"
#include "esp_log.h"
#include "sdkconfig.h"
#include "main.h"

#define CONFIG_ECHO_UART_RXD 22
#define CONFIG_ECHO_UART_TXD 23
#define CONFIG_ECHO_UART_RTS 18
#define CONFIG_ECHO_UART_PORT_NUM 2
#define CONFIG_ECHO_UART_BAUD_RATE 115200

#define ECHO_TEST_TXD   (CONFIG_ECHO_UART_TXD)
#define ECHO_TEST_RXD   (CONFIG_ECHO_UART_RXD)
#define ECHO_TEST_RTS   (CONFIG_ECHO_UART_RTS)

#define ECHO_TEST_CTS   (UART_PIN_NO_CHANGE)
#define BUF_SIZE        (127)
#define BAUD_RATE       (CONFIG_ECHO_UART_BAUD_RATE)

#define PACKET_READ_TICS        (100 / portTICK_PERIOD_MS)
#define ECHO_TASK_STACK_SIZE    (2048)
#define ECHO_TASK_PRIO          (10)
#define ECHO_UART_PORT          (CONFIG_ECHO_UART_PORT_NUM)

#define ECHO_READ_TOUT          (3)

#define nitrogen_reg            0x04
#define phosphorus_reg          0x05
#define potassium_reg           0x06

void uart_RS485_thread_init(void);

#endif
