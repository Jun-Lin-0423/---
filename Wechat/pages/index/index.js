var md5 = require('../../utils/md5.js');
var app = getApp();
Page({
    onReady() {
    },
    data: {
        username: 'loongson',
        password:'loongson',
      },
    test: function () {
        var name = this.data.username
        var passd = this.data.password
        if(this.data.username == '')
        {
            wx.showToast({
                title: '用户名为空！',
                icon: 'error',
                duration: 1500
               })
               return
        }
        if(this.data.password == '')
        {
            wx.showToast({
                title: '密码为空！',
                icon: 'error',
                duration: 1500
               })
               return
        }
        wx.showToast({
            title: '登录中...',
            icon: 'loading',
            duration: 2000
           })
        wx.request({
          url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/login?name='+name+'&password=' + md5.hexMD5(passd),
          success:function(res){
            app.globalData.username = name;
            app.globalData.usertoken = res.data.token;
            console.log(res);
            console.log(res.data);
            if(res.data != "error") {
                wx.showToast({
                    title: '登录成功！',
                    icon: 'success',
                    duration: 1500
                   })        
            wx.redirectTo({
                    url: '../device/device',
                        success: function (res) {
                    },
                        fail: function () {
                    }, 
                        complete: function () {
                    }
                })
            } else {
                wx.showToast({
                    title: '登录失败！',
                    icon: 'error',
                    duration: 1500
                   })

            }
          },
        })
    }
  })