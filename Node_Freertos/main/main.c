#include "main.h"

struct node_data_package Nodedata, ServerData;
extern QueueHandle_t Node_Data_Queue;

char node_id[]  =   "0c7d1bb48e0aa021";
int sock;


static void SocketSend_Task(void *pvParameters)
{
    while (1)
    {
        while (1)
        {
        	cJSON *root = cJSON_CreateObject();
            cJSON_AddStringToObject(root, "node_id", node_id);
            cJSON_AddStringToObject(root, "temperature", (char *)Nodedata.temperature);
            cJSON_AddStringToObject(root, "humidity", (char *)Nodedata.humidity);
            cJSON_AddStringToObject(root, "light_intensity", (char *)Nodedata.light_intensity);
            cJSON_AddStringToObject(root, "carbon_dioxide", (char *)Nodedata.carbon_dioxide);
            cJSON_AddStringToObject(root, "nitrogen", (char *)Nodedata.nitrogen);
            cJSON_AddStringToObject(root, "phosphorus", (char *)Nodedata.phosphorus);
            cJSON_AddStringToObject(root, "potassium", (char *)Nodedata.potassium);
            cJSON_AddStringToObject(root, "node_power", (char *)Nodedata.power);

            int err = send(sock, cJSON_Print(root), strlen(cJSON_Print(root)), 0);
            if (err < 0)
            {
                break;
            }
            vTaskDelay(2000 / portTICK_PERIOD_MS);
        }

        if (sock != -1)
        {
            shutdown(sock, 0);
            close(sock);
        }
    }
    vTaskDelete(NULL);
}


void SocketRecv_Task(void * parc)
{
    char rx_buffer[128];
	while (1)
	{
		int len = recv(sock, rx_buffer, sizeof(rx_buffer) - 1, 0);
		if (len < 0)
		{
			break;
		}
		else
		{
			sscanf(rx_buffer, "{'LED': '%hhd', 'fan': '%hhd', 'relay1': '%hhd', 'relay2': '%hhd', 'mode': '%hhd'}", &ServerData.Led, &ServerData.Fan, &ServerData.Relay1, &ServerData.Relay2, &ServerData.Mode);
			xTaskResumeAll();
			xQueueSend(Node_Data_Queue, &ServerData, portMAX_DELAY);
			vTaskSuspendAll();
		}

		vTaskDelay(2000 / portTICK_PERIOD_MS);
	}

	if (sock != -1)
	{
		shutdown(sock, 0);
		close(sock);
	}
}

void app_main(void)
{
    char host_ip[] = HOST_IP_ADDR;
    int addr_family = 0;
    int ip_protocol = 0;
    struct sockaddr_in dest_addr;
	dest_addr.sin_addr.s_addr = inet_addr(host_ip);
	dest_addr.sin_family = AF_INET;
	dest_addr.sin_port = htons(PORT);
	addr_family = AF_INET;
	ip_protocol = IPPROTO_IP;

    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    ESP_ERROR_CHECK(example_connect());

    sock = socket(addr_family, SOCK_STREAM, ip_protocol);
    connect(sock, (struct sockaddr *)&dest_addr, sizeof(struct sockaddr_in6));

    adc_thread_init();
    queue_thread_init();
    realy_thread_init();
    ens160_thread_init();
    uart_RS485_thread_init();

    xTaskCreate(SocketSend_Task, "SocketSend_Task", 4096, NULL, 5, NULL);
    xTaskCreate(SocketRecv_Task, "SocketRecv_Task", 4096, NULL, 6, NULL);
}

