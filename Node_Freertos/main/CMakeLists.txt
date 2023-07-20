# See the build system documentation in IDF programming guide
# for more information about component CMakeLists.txt files.

idf_component_register(
    SRCS "main.c" "relay/noderelay.c" "queue/nodeQueue.c" "tool/cJSON.c" "adc/nodeadc.c" "i2c/nodei2c.c" "uart_rs485/uartRS485.c"      # list the source files of this component
    INCLUDE_DIRS "." "relay/" "queue/" "tool/" "./" "adc/" "i2c/" "uart_rs485/"                                                              # optional, add here public include directories
    PRIV_INCLUDE_DIRS                                                                                                                        # optional, add here private include directories
    REQUIRES                                                                                                                                 # optional, list the public requirements (component names)
    PRIV_REQUIRES                                                                                                                            # optional, list the private requirements
)
