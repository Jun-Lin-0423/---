// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    server_ip:'192.168.0.100',
    server_port:'8080',
    userInfo: null,
    mqtt_msg:null,
    username:null,
    usertoken:null,
    device:null,
    device_id:null,
    node:null,
    nodeData:null,
  }
})
