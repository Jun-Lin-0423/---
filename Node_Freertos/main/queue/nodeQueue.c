#include "queue/nodeQueue.h"

QueueHandle_t Node_Data_Queue = NULL;

#define QUEUE_LEN 50
#define QUEUE_SIZE sizeof(struct node_data_package)

extern struct node_data_package Nodedata;

static void queue_thread(void *parm)
{
	printf("queue thread create successfuly\n");
	xTaskResumeAll();
	Node_Data_Queue = xQueueCreate((UBaseType_t ) QUEUE_LEN,(UBaseType_t ) QUEUE_SIZE);
	if (NULL != Node_Data_Queue)
	{
		printf("queue create successfuly\n");
	}
	vTaskSuspendAll();
	while (1)
	{
		xTaskResumeAll();

		if (xQueueReceive(Node_Data_Queue, &Nodedata, portMAX_DELAY) == pdPASS)
		{
			printf("Received data successfuly\n");
		}
		else
		{
			printf("Failed to receive data from queue\n");
		}

		vTaskSuspendAll();
		vTaskDelay(2000 / portTICK_PERIOD_MS);
	}
	vTaskDelete(NULL);
}

void queue_thread_init(void)
{
    xTaskCreate(queue_thread, "queue_thread", 4096, NULL, 4, NULL);
}
