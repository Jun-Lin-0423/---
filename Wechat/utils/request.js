var mqtt = require('./mqtt.min.js')
const crypto = require('./hex_hmac_sha1.js'); 
var app = getApp();

function signHmacSha1(params, deviceSecret) {
    let keys = Object.keys(params).sort();
    // 按字典序排序
    keys = keys.sort();
    const list = [];
    keys.map((key) => {
      list.push(`${key}${params[key]}`);
    });
    const contentStr = list.join('');
    return crypto.hex_hmac_sha1(deviceSecret, contentStr);
}

function initMqttOptions(deviceConfig) {
    const params = {
      productKey: deviceConfig.productKey,
      deviceName: deviceConfig.deviceName,
      timestamp: Date.now(),
      clientId: Math.random().toString(36).substr(2),
    }

    const options = {
      keepalive: 60, //60s
      clean: true, //cleanSession不保持持久会话
      protocolVersion: 4 //MQTT v3.1.1
    }
    options.password = signHmacSha1(params, deviceConfig.deviceSecret);
    options.clientId = `${params.clientId}|securemode=2,signmethod=hmacsha1,timestamp=${params.timestamp}|`;
    options.username = `${params.deviceName}&${params.productKey}`;
    return options;
}

async function aliyun_mqtt(Key,Name,Secret) {
    const deviceConfig = {
        productKey: Key,
        deviceName: Name,
        deviceSecret: Secret,
        regionId: "cn-shanghai"
    };
    const options = initMqttOptions(deviceConfig);
    console.log(options)
    const client = mqtt.connect('wxs://productKey.iot-as-mqtt.cn-shanghai.aliyuncs.com',options)
    client.on('connect', function () {
    console.log('连接服务器成功')
    //注意：订阅主题，替换productKey和deviceName(这里的主题可能会不一样，具体请查看控制台-产品详情-Topic 类列表下的可订阅主题)，并且确保改主题的权限设置为可订阅
    client.subscribe('/iifbvEj1I1s/demo/user/get', function (err) {
        if (!err) {
            console.log('订阅成功！');
        }
    })})
    //接收消息监听
    client.on('message', function (topic, message) {
        let msg = message.toString();
        const obj = JSON.parse(msg);
        //client.end()
        app.globalData.mqtt_msg = obj;
    })
     
}


module.exports = {
    aliyun_mqtt: aliyun_mqtt,
  }