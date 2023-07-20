#ifndef NODEI2C_H_
#define NODEI2C_H_


#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/event_groups.h"
#include <unistd.h>
#include "driver/gpio.h"
#include "main.h"
#include <stdio.h>
#include "esp_log.h"
#include "driver/i2c.h"
void ens160_thread_init(void);

#endif
