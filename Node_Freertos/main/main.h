#ifndef MAIN_MAIN_H_
#define MAIN_MAIN_H_

#include <string.h>
#include <sys/param.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/event_groups.h"
#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "protocol_examples_common.h"
#include "addr_from_stdin.h"
#include "lwip/err.h"
#include "lwip/sockets.h"
#include "tool/cJSON.h"
#include "freertos/queue.h"
#include "driver/gpio.h"
#include "adc/nodeadc.h"
#include "queue/nodeQueue.h"
#include "relay/noderelay.h"
#include "i2c/nodei2c.h"
#include "uart_rs485/uartRS485.h"

#define HOST_IP_ADDR CONFIG_EXAMPLE_IPV4_ADDR
#define PORT CONFIG_EXAMPLE_PORT
#define uchar unsigned char

struct  node_data_package{
	uint32_t temperature;
	uint32_t humidity;
	uint32_t light_intensity;
	uint32_t carbon_dioxide;
	uint32_t nitrogen;
	uint32_t phosphorus;
	uint32_t potassium;
	uint32_t power;
	uint8_t Led;
	uint8_t Fan;
	uint8_t Relay1;
	uint8_t Relay2;
	uint8_t Mode;
};

#endif
