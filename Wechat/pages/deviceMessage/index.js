var app = getApp();
var that = this;
var interval;
import Toast from '@vant/weapp/toast/toast';
Page({
    data:{
        MODE:false,
        checked: false,
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        array:null,
        none:false,
        temperature:null,
        humidity:null,
        light_intensity:null,
        nitrogen:null,
        phosphorus:null,
        potassium:null,
        carbon_dioxide:null,
        time:null,
        
    },
    onjudge(params) {
        if(params == true)
        {
            return 1
        }
        else{
            return 0
        }
    },
    onChange({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked: detail });
        
        console.log(detail);
        if(detail == true)
        {
            this.setData({ MODE: true });
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                }
            });
        } else {
            this.setData({ MODE: false });
        wx.request({
            url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
            success:function(res){
                app.globalData.username = app.globalData.username;
                app.globalData.usertoken = res.data.token;
                app.globalData.node = res.data.node;
                console.log(res.data);
            }
        }); 
           }
      },
    onChange1({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked1: detail });
        console.log(detail);
        
        if(detail == true)
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                }
            });
        } else {
        wx.request({
            url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
            success:function(res){
                app.globalData.username = app.globalData.username;
                app.globalData.usertoken = res.data.token;
                app.globalData.node = res.data.node;
                console.log(res.data);
            }
        }); 
           }
      },
      onChange2({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked2: detail });
        if(detail == true)
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                }
            });
        } else {
        wx.request({
            url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
            success:function(res){
                app.globalData.username = app.globalData.username;
                app.globalData.usertoken = res.data.token;
                app.globalData.node = res.data.node;
                console.log(res.data);
            }
        }); 
           }
      },
      onChange3({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked3: detail });
        if(detail == true)
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                }
            });
        } else {
        wx.request({
            url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
            success:function(res){
                app.globalData.username = app.globalData.username;
                app.globalData.usertoken = res.data.token;
                app.globalData.node = res.data.node;
                console.log(res.data);
            }
        }); 
           }
      },
      onChange4({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked4: detail });
        if(detail == true)
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{'LED':'"+this.onjudge(this.data.checked1)+"','fan':'"+this.onjudge(this.data.checked2)+"','relay1':'"+this.onjudge(this.data.checked3)+"','relay2':'"+this.onjudge(this.data.checked4)+"','mode':'"+this.onjudge(this.data.checked)+"'}",
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                }
            });
        } else {
        wx.request({
            url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&instruct='+"{\"LED\": \""+this.onjudge(this.data.checked1)+"\", \"fan\": \""+this.onjudge(this.data.checked2)+"\", \"relay1\": \""+this.onjudge(this.data.checked3)+"\", \"relay2\": \""+this.onjudge(this.data.checked4)+"\", \"mode\": \""+this.onjudge(this.data.checked)+"\"}",
            success:function(res){
                app.globalData.username = app.globalData.username;
                app.globalData.usertoken = res.data.token;
                app.globalData.node = res.data.node;
                console.log(res.data);
            }
        }); 
           }
      },
    onLoad(){
        var that = this;
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
        var that = this;
        // interval = setInterval(function() {
        //     setTimeout(()=>
        // {
        //     wx.request({
        //         url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct/select?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id,
        //         success:function(res){
        //             app.globalData.username = app.globalData.username;
        //             app.globalData.usertoken = res.data.token;
        //             app.globalData.node = res.data.node;
        //             console.log(app.globalData.username);
        //             console.log(res.data.instruct);
        //             console.log(JSON.parse(res.data.instruct)['LED']);
        //             console.log("111");
        //             console.log(res.data.instruct.slice(5,10));

        //             if(JSON.parse(res.data.instruct)['LED'] == 1)
        //             {
        //                 that.setData({ 
        //                     checked1:true
        //             });
        //             }else{
        //                 that.setData({ 
        //                     checked1:false
        //             });
        //             }
        //             if(JSON.parse(res.data.instruct)['fan'] == 1)
        //             {
        //                 that.setData({ 
        //                     checked2:true
        //             });
        //             }else{
        //                 that.setData({ 
        //                     checked2:false
        //             });
        //             }
        //             if(JSON.parse(res.data.instruct)['relay1'] == 1)
        //             {
        //                 that.setData({ 
        //                     checked3:true
        //             });
        //             }else{
        //                 that.setData({ 
        //                     checked3:false
        //             });
        //             }
        //             if(JSON.parse(res.data.instruct)['relay2'] == 1)
        //             {
        //                 that.setData({ 
        //                     checked4:true
        //             });
        //             }else{
        //                 that.setData({ 
        //                     checked4:false
        //             });
        //             }
        //             if(JSON.parse(res.data.instruct)['mode'] == 1)
        //             {
        //                 that.setData({ 
        //                     checked:true,
        //                     MODE:true,
        //             });
        //             }else{
        //                 that.setData({ 
        //                     checked:false,
        //                     MODE:false,
        //             });
        //             }
        //         }
        //     })
        // }, 3*1000);
        //     console.log("5秒了----------------------------------------------------")
        //   }, 7000)
        setTimeout(()=>
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/data?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&row=1',
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                    console.log(JSON.parse(res.data.node));
                    that.setData({ 
                        temperature: JSON.parse(res.data.node)[0].temperature+' °C' ,
                        humidity: JSON.parse(res.data.node)[0].humidity+' %RH' ,
                        light_intensity: JSON.parse(res.data.node)[0].light_intensity+' Lux' ,
                        nitrogen: JSON.parse(res.data.node)[0].nitrogen+' g/100 mL' ,
                        phosphorus: JSON.parse(res.data.node)[0].phosphorus+' g/100 mL' ,
                        potassium: JSON.parse(res.data.node)[0].potassium+' g/100 mL' ,
                        carbon_dioxide: JSON.parse(res.data.node)[0].carbon_dioxide+' ppm' ,
                        time: JSON.parse(res.data.node)[0].time ,
                });
                }
            })
        }, 1*100);
        setTimeout(()=>
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/instruct/select?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id,
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(app.globalData.username);
                    console.log(res.data.token);
                    console.log(JSON.parse(res.data.instruct)['LED']);
                    console.log("111");
                    console.log(res.data.instruct.slice(5,10));

                    if(JSON.parse(res.data.instruct)['LED'] == 1)
                    {
                        that.setData({ 
                            checked1:true
                    });
                    }else{
                        that.setData({ 
                            checked1:false
                    });
                    }
                    if(JSON.parse(res.data.instruct)['fan'] == 1)
                    {
                        that.setData({ 
                            checked2:true
                    });
                    }else{
                        that.setData({ 
                            checked2:false
                    });
                    }
                    if(JSON.parse(res.data.instruct)['relay1'] == 1)
                    {
                        that.setData({ 
                            checked3:true
                    });
                    }else{
                        that.setData({ 
                            checked3:false
                    });
                    }
                    if(JSON.parse(res.data.instruct)['relay2'] == 1)
                    {
                        that.setData({ 
                            checked4:true
                    });
                    }else{
                        that.setData({ 
                            checked4:false
                    });
                    }
                    if(JSON.parse(res.data.instruct)['mode'] == 1)
                    {
                        that.setData({ 
                            checked:true,
                            MODE:true,
                    });
                    }else{
                        that.setData({ 
                            checked:false,
                            MODE:false,
                    });
                    }
                }
            })
        }, 3*500);
        setTimeout(()=>
        {
            wx.request({
                url: 'http://'+app.globalData.server_ip+':'+app.globalData.server_port+'/messages?name='+app.globalData.username+'&device='+app.globalData.device_id+'&token='+app.globalData.usertoken+'&node='+app.globalData.node_id+'&row=1',
                success:function(res){
                    app.globalData.username = app.globalData.username;
                    app.globalData.usertoken = res.data.token;
                    app.globalData.node = res.data.node;
                    console.log(res.data);
                    console.log(JSON.parse(res.data.node));
                    that.setData({ 
                        array: JSON.parse(res.data.node),
                });
                }
            })
        }, 5*500);
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