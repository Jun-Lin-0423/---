#include "relay/noderelay.h"

#define RELAY_GPIOA 13
#define RELAY_GPIOB 12
#define RELAY_GPIOC 25
#define RELAY_GPIOD 26

extern struct node_data_package Nodedata;

static void configure_relay_gpio(void)
{
    gpio_reset_pin(RELAY_GPIOA);
    gpio_reset_pin(RELAY_GPIOB);
    gpio_reset_pin(RELAY_GPIOC);
    gpio_reset_pin(RELAY_GPIOD);

    gpio_set_direction(RELAY_GPIOA, GPIO_MODE_OUTPUT);
    gpio_set_direction(RELAY_GPIOB, GPIO_MODE_OUTPUT);
    gpio_set_direction(RELAY_GPIOC, GPIO_MODE_OUTPUT);
    gpio_set_direction(RELAY_GPIOD, GPIO_MODE_OUTPUT);

}

static void relay_thread(void *pvParameters)
{
	configure_relay_gpio();
	printf("socket_thread create successfuly!\n");
	while(1)
	{
		gpio_set_level(RELAY_GPIOA, Nodedata.Led);
		gpio_set_level(RELAY_GPIOB, Nodedata.Fan);
		gpio_set_level(RELAY_GPIOC, Nodedata.Relay1);
		gpio_set_level(RELAY_GPIOD, Nodedata.Relay2);
        sleep(1);
	}
}

void realy_thread_init(void)
{
    xTaskCreate(relay_thread, "relay_thread", 4096, NULL, 5, NULL);
}
