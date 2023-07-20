var net = require('../../utils/request.js');
var md5 = require('../../utils/md5.js');
var app = getApp();
let res = {
    categories: ["周一","周二","周三","周四","周五","周六"],
    series: [
      {
        name: "节点A",
        data: [25,26,25,25,24,22]
      },
      {
        name: "节点B",
        data: [23,25,24,23,23,21]
      },
      {
        name: "节点C",
        data: [26,27,29,28,28,25]
      }
    ]
  };

var app = getApp();

Page({
    onLoad: function (options) {
        var that =this
        var username = "loongson"
        var password = "loongson"
        // wx.request({
        //   url: 'http://127.0.0.1:8080/login?name='+username+'&password=' + md5.hexMD5(password),
        //   success:function(res){
        //     app.globalData.username = username;
        //     app.globalData.usertoken = res.data.token;
        //     console.log(res.data);
        //   }
        // })
        setTimeout(()=>
        {
            wx.request({
                url: 'http://127.0.0.1:8080/devices?name='+app.globalData.username+'&token='+app.globalData.usertoken,
                success:function(res){
                    app.globalData.username = username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.device = res.data.device;
                    console.log(res.data);
                }
            })
        }, 3*1000);
    
        setTimeout(()=>
        {
            wx.request({
                url: 'http://127.0.0.1:8080/nodes?name='+app.globalData.username+'&device='+JSON.parse(app.globalData.device)[0].device_id+'&token='+app.globalData.usertoken,
                success:function(res){
                    app.globalData.username = username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                }
            })
        }, 6*1000);
        setTimeout(()=>
        {
            wx.request({
                url: 'http://127.0.0.1:8080/data?name='+app.globalData.username+'&device='+JSON.parse(app.globalData.device)[0].device_id+'&token='+app.globalData.usertoken+'&node='+JSON.parse(app.globalData.node)[0].node_id+'&row=10',
                success:function(res){
                    app.globalData.username = username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(JSON.parse(res.data.node));
                }
            })
        }, 9*1000);
        setTimeout(()=>
        {
            wx.request({
                url: 'http://127.0.0.1:8080/messages?name='+app.globalData.username+'&device='+JSON.parse(app.globalData.device)[0].device_id+'&token='+app.globalData.usertoken+'&node='+JSON.parse(app.globalData.node)[0].node_id+'&row=1',
                success:function(res){
                    app.globalData.username = username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                }
            })
        }, 11*1000);
      },
    data: {
        min:21,
        ave:27,
        max:29,
        now:26,
      chartData: {},
      opts: {
          color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [15,10,0,15],
          enableScroll: false,
          legend: {},
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            gridType: "dash",
            dashLength: 2
          },
          extra: {
            line: {
              type: "curve",
              width: 2,
              activeType: "hollow"
            }
          }
        }
    },
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        wx.stopPullDownRefresh() //停止下拉刷新

        setTimeout(function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },
    onReady() {
        this.setData({ chartData: JSON.parse(JSON.stringify(res)) });
    },
  })