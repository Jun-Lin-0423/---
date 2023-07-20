#include "uartRS485.h"

extern struct node_data_package Nodedata;
const int uart_num = ECHO_UART_PORT;

static void echo_send(const int port, const char* str, uint8_t length)
{
    if (uart_write_bytes(port, str, length) != length) {
        abort();
    }
}


void echo_send_data(void)
{
	echo_send(uart_num, (const char*)"0X01", 1);
	echo_send(uart_num, (const char*)nitrogen_reg, 1);
	echo_send(uart_num, (const char*)"0x00", 1);
	echo_send(uart_num, (const char*)"0x00", 1);
	echo_send(uart_num, (const char*)"0x00", 1);
	echo_send(uart_num, (const char*)"0x07", 1);
	echo_send(uart_num, (const char*)"0x44", 1);
	echo_send(uart_num, (const char*)"0X09", 1);
}
static void echo_task(void *arg)
{

    uart_config_t uart_config = {
        .baud_rate = BAUD_RATE,
        .data_bits = UART_DATA_8_BITS,
        .parity = UART_PARITY_DISABLE,
        .stop_bits = UART_STOP_BITS_1,
        .flow_ctrl = UART_HW_FLOWCTRL_DISABLE,
        .rx_flow_ctrl_thresh = 122,
        .source_clk = UART_SCLK_DEFAULT,
    };

    ESP_ERROR_CHECK(uart_driver_install(uart_num, BUF_SIZE * 2, 0, 0, NULL, 0));
    ESP_ERROR_CHECK(uart_param_config(uart_num, &uart_config));
    ESP_ERROR_CHECK(uart_set_pin(uart_num, ECHO_TEST_TXD, ECHO_TEST_RXD, ECHO_TEST_RTS, ECHO_TEST_CTS));
    ESP_ERROR_CHECK(uart_set_mode(uart_num, UART_MODE_RS485_HALF_DUPLEX));
    ESP_ERROR_CHECK(uart_set_rx_timeout(uart_num, ECHO_READ_TOUT));
    uint8_t* data = (uint8_t*) malloc(BUF_SIZE);

    while(1) {
    	echo_send_data();

        int len = uart_read_bytes(uart_num, data, BUF_SIZE, PACKET_READ_TICS);

        if (len > 0) {
        	Nodedata.nitrogen   = (uint32_t)data[7];
        	Nodedata.phosphorus = (uint32_t)data[8];
        	Nodedata.potassium  = (uint32_t)data[9];
        } else {
            ESP_ERROR_CHECK(uart_wait_tx_done(uart_num, 10));
        }
    }
    vTaskDelete(NULL);
}

void uart_RS485_thread_init(void)
{
    xTaskCreate(echo_task, "uart_echo_task", ECHO_TASK_STACK_SIZE, NULL, ECHO_TASK_PRIO, NULL);
}

