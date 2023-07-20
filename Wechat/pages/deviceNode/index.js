var app = getApp();

import Toast from '@vant/weapp/toast/toast';
Page({
    data:{
        none:false,
        array:null,
    },
    openNode:function (e) {
        
        app.globalData.node_id = e.currentTarget.dataset.node_id
        console.log(app.globalData.node_id)
        wx.navigateTo({
            url: '../deviceMessage/index',
                success: function (res) {
            },
                fail: function () {
            }, 
                complete: function () {
            }
        })
    },
    onLoad(){
        var that = this;
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
        var that = this;
        setTimeout(()=>
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/nodes?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken,
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    
                    if(res.data.node==='[]'){
                        console.log("123");
                        that.setData({ none : true });
                    }
                    that.setData({ array: JSON.parse(JSON.parse(JSON.stringify(res.data)).node) });
                    console.log(res.data);
                }
            })
        }, 1*1000);
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
})