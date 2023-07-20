#include "i2c/nodei2c.h"

#define I2C_MASTER_SCL_IO           19      /*!< GPIO number used for I2C master clock */
#define I2C_MASTER_SDA_IO           18      /*!< GPIO number used for I2C master data  */
#define I2C_MASTER_NUM              0                          /*!< I2C master i2c port number, the number of i2c peripheral interfaces available will depend on the chip */
#define I2C_MASTER_FREQ_HZ          400000                     /*!< I2C master clock frequency */
#define I2C_MASTER_TX_BUF_DISABLE   0                          /*!< I2C master doesn't need buffer */
#define I2C_MASTER_RX_BUF_DISABLE   0                          /*!< I2C master doesn't need buffer */
#define I2C_MASTER_TIMEOUT_MS       1000

#define ENS160_ADDR           0x52
#define ENS160_DATA_REG       0x24
#define ENS160_OPMODE         0x10
#define ENS160_OPMODE_START   0x02
#define ENS160_OPMODE_STOP    0x01

extern struct node_data_package Nodedata;

static void ens160_register_read(uint8_t reg_addr, uint8_t *data, size_t len)
{
	i2c_cmd_handle_t cmd = i2c_cmd_link_create();
	i2c_master_start(cmd);
	i2c_master_write_byte(cmd, ENS160_ADDR << 1, true);
	i2c_master_write_byte(cmd, reg_addr | 0x01, true);
	i2c_master_write_byte(cmd, (ENS160_ADDR << 1) | 0x01, true);	//从机地址及读写位
	i2c_master_read_byte(cmd, data, true);

	i2c_master_stop(cmd);					//终止信号
	i2c_master_cmd_begin(I2C_MASTER_NUM, cmd, 1000 / portTICK_PERIOD_MS);
	i2c_cmd_link_delete(cmd);
}



static void ens160_register_write_byte(uint8_t reg_addr, uint8_t *data)
{
	i2c_cmd_handle_t cmd = i2c_cmd_link_create();

	i2c_master_start(cmd);					//起始信号
	i2c_master_write_byte(cmd, ENS160_ADDR, true);	//从机地址及读写位
	i2c_master_write_byte(cmd, reg_addr, true);	//从机地址及读写位
	i2c_master_write(cmd, data, sizeof(data), true);	//数据位(数组)
	i2c_master_stop(cmd);					//终止信号
	i2c_master_cmd_begin(I2C_MASTER_NUM, cmd, 1000 / portTICK_PERIOD_MS);
	i2c_cmd_link_delete(cmd);
}



static esp_err_t i2c_master_init(void)
{
    int i2c_master_port = I2C_MASTER_NUM;

    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = I2C_MASTER_SDA_IO,
        .scl_io_num = I2C_MASTER_SCL_IO,
        .sda_pullup_en = GPIO_PULLUP_ENABLE,
        .scl_pullup_en = GPIO_PULLUP_ENABLE,
        .master.clk_speed = I2C_MASTER_FREQ_HZ,
    };

    i2c_param_config(i2c_master_port, &conf);

    return i2c_driver_install(i2c_master_port, conf.mode, I2C_MASTER_RX_BUF_DISABLE, I2C_MASTER_TX_BUF_DISABLE, 0);
}



static void ens160_thread(void *pvParameters)
{
	uint8_t ens160data;
	ens160_register_write_byte(ENS160_OPMODE, (uint8_t *)ENS160_OPMODE_START);
	while(1)
	{
		ens160_register_read(ENS160_DATA_REG, &ens160data, sizeof(uint8_t) * 2);
		Nodedata.temperature = ens160data;
		vTaskDelay(2000 / portTICK_PERIOD_MS);
	}
}



void ens160_thread_init(void)
{
	ESP_ERROR_CHECK(i2c_master_init());
    xTaskCreate(ens160_thread, "ens160_thread", 4096, NULL, 5, NULL);
}


