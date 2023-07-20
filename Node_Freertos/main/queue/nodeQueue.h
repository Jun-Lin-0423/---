#ifndef NODE_QUEUE_H_
#define NODE_QUEUE_H_

#include <stdio.h>
#include <inttypes.h>
#include "sdkconfig.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_chip_info.h"
#include "esp_flash.h"
#include "freertos/queue.h"
#include "main.h"

void queue_thread_init(void);

#endif
