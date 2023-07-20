// pages/device/device.js    
var net = require('../../utils/request.js');
var md5 = require('../../utils/md5.js');
var app = getApp();
import Dialog from '@vant/weapp/dialog/dialog';
import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array:null,
        info: 'init data',
        msglist: [{msg: 'hello'},{msg: 'world'}],
        activeKey: 0,
        none : false,
    },
    openDevice:function (e) {
        app.globalData.device_id = e.currentTarget.dataset.device_id
        wx.navigateTo({
            url: '../deviceNode/index',
                success: function (res) {
            },
                fail: function () {
            }, 
                complete: function () {
            }
        })
    },
    deleteDevice: function (e) {
        var device_id=e.currentTarget.dataset.device_id;
        console.log(device_id);
        console.log(e.currentTarget.dataset.device_id);
        var that = this;
        Dialog.confirm({
            title: '提示',
            message: '确认删除设备？',
          })
            .then(() => {
              // on confirm
              wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/devices/delete?name='+app.globalData.username+'&token='+app.globalData.usertoken+'&device_id='+e.currentTarget.dataset.device_id,
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.device = res.data.device;
                    console.log(res.data.device);
                    if(res.data.device==='[]'){
                        that.setData({ none : true });
                    }else{
                        that.setData({ none : false });
                    }
                    //.log(res.data);
                    //console.log(JSON.parse(JSON.parse(JSON.stringify(res.data)).device));
                    that.setData({ array: JSON.parse(JSON.parse(JSON.stringify(res.data)).device) });
                }
            });
            })
            .catch(() => {
              // on cancel
            });   
    },
    test:function(params) {
        var that = this;
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
              console.log(res.result)
              wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/devices/increase?name='+app.globalData.username+'&token='+app.globalData.usertoken+'&device_id='+res.result,
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.device = res.data.device;
                    console.log(res.data);
                    if(res.data.device==='[]'){
                        that.setData({ none : true });
                    }else{
                        that.setData({ none : false });
                    }
                    console.log("123")
                    //.log(res.data);
                    //console.log(JSON.parse(JSON.parse(JSON.stringify(res.data)).device));
                    that.setData({ array: JSON.parse(JSON.parse(JSON.stringify(res.data)).device) });
                }
            })
            }
          })
    },
    takePhoto() {
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            this.setData({
              src: res.tempImagePath
            })
          }
        })
      },
      error(e) {
        console.log(e.detail)
      },
 
    onChange(event) {
    Notify({ type: 'primary', message: event.detail });
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
        setTimeout(()=>
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/devices?name='+app.globalData.username+'&token='+app.globalData.usertoken,
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.device = res.data.device;
                    //.log(res.data);
                    //console.log(JSON.parse(JSON.parse(JSON.stringify(res.data)).device));
                    console.log(JSON.parse(JSON.parse(JSON.stringify(res.data)).device).length);
                    if(res.data.device==='[]'){
                        that.setData({ none : true });
                    }else{
                        that.setData({ none : false });
                    }
                    
                    console.log(that.data.array);
                    // 创建一个 Date 对象
                    const now = new Date();
                    // 获取年份
                    const year = now.getFullYear();
                    // 获取月份，月份从 0 开始，需要加 1
                    const month = now.getMonth() + 1;
                    // 获取日期
                    const day = now.getDate();
                    // 获取小时
                    const hours = now.getHours();
                    // 获取分钟
                    const minutes = now.getMinutes();
                    var tmp = 0;
                    var json = JSON.parse(JSON.parse(JSON.stringify(res.data)).device);
                    for (let i = 0; i < JSON.parse(JSON.parse(JSON.stringify(res.data)).device).length; i++) {
                        if(year == parseInt(JSON.parse(JSON.parse(JSON.stringify(res.data)).device)[i]['online'].slice(0,4))){
                            tmp = '1';
                            if(month == parseInt(JSON.parse(JSON.parse(JSON.stringify(res.data)).device)[i]['online'].slice(5,7))){
                                tmp = '1';
                                if(day == parseInt(JSON.parse(JSON.parse(JSON.stringify(res.data)).device)[i]['online'].slice(8,10))){
                                    tmp = '1';
                                    if(hours == parseInt(JSON.parse(JSON.parse(JSON.stringify(res.data)).device)[i]['online'].slice(11,13))){
                                        tmp = '1';
                                        if(minutes - 1 <= parseInt(JSON.parse(JSON.parse(JSON.stringify(res.data)).device)[i]['online'].slice(14,16))){
                                            tmp = '1';
                                            console.log("123");
                                        }
                                        else{
                                            tmp = '0';
                                        }
                                    }
                                    else{
                                        tmp = '0';
                                    }
                                }
                                else{
                                    tmp = '0';
                                }
                            }
                            else{
                                tmp = '0';  
                            }
                        }
                        else{
                            tmp = '0';    
                        }
                        if(tmp == 1){
                            json[i].online = true;
                        }
                        else{
                            json[i].online = false;
                        }
                    
        
                      }
                      that.setData({ array: json });
                      console.log(json);
                }
            })
        }, 1*1000);
    },
    onfresh: function (params) {
        var that = this;
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/devices?name='+app.globalData.username+'&token='+app.globalData.usertoken,
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.device = res.data.device;
                    //.log(res.data);
                    //console.log(JSON.parse(JSON.parse(JSON.stringify(res.data)).device));
                    console.log(res.data.device);
                    if(res.data.device==='[]'){
                        that.setData({ none : true });
                    }else{
                        that.setData({ none : false });
                    }
                    that.setData({ array: JSON.parse(JSON.parse(JSON.stringify(res.data)).device) });
                }
            })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.hideHomeButton()
      },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },
    onPullDownRefresh: function () {
        var that = this;
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
          that.onLoad();
        wx.stopPullDownRefresh({
          success: (res) => {
          },
        })
      },
    
    /**    onShareAppMessage() {
    }
     * 用户点击右上角分享
     */

})