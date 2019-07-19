let keys = 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS';
let _page, _this;
import Data from "./data.js";
// pages/address/address.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: [{
      name: "张三",
      tel: "14714714714",
      province1: "北京市",
      province2: "北京市",
      city: "西城区",
      county: "南莱园街88号",
      check: true,
      Topping: true
    },
    {
      name: "张三",
      tel: "14714714714",
      province1: "北京市",
      province2: "北京市",
      city: "西城区",
      county: "南莱园街88号",
      check: false,
      Topping: false
    }],
    show: false,
    areaList: {},
    name: "",
    tel: "",
    province1: "",
    province2: "",
    city: "",
    county: "",
    check: false,
    Topping: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(Data)
    this.setData({
      areaList: Data
    })
    // 自动获取当前的位置
    //var _this = this;
    //调用定位方法
    //_this.getUserLocation();*/
  },
  /*
  //定位方法
  getUserLocation: function() {
    var _this = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          //未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function(res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.geo();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API
          _this.geo();
        } else {
          console.log('授权成功')
          //调用wx.getLocation的API
          _this.geo();
        }
      }
    })
  },
  // 获取定位城市
  geo: function() {
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2/?ak=xxxxxxxxxxxx&location=' + res.latitude + ',' + res.longitude + '&output=json',
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function(ops) {
            console.log(ops)
            console.log('定位城市：', ops.data.result.addressComponent.city)
          },
          fail: function(resq) {
            wx.showModal({
              title: '信息提示',
              content: '请求失败',
              showCancel: false,
              confirmColor: '#f37938'
            });
          },
          complete: function() {
          }
        })
      }
    })
  },*/
  
  // 获取当前的位置
  add() {
    let show = !this.show;
    this.setData({
      show: show
    })
  }, 
  onClose() {
    this.setData({ show: false });
  },
  // 获取用户名、手机号
  getName(e){
    // console.log(e.detail)
    this.setData({
      name: e.detail.value
    })
  },
  getTel(e){
    // console.log(e.detail)
    this.setData({
      tel: e.detail.value
    })
  },
  save(){
    let _this = this;
    let list = this.data.data;
    let obj = {
      name: _this.data.name,
      tel: _this.data.tel,
      province1: _this.data.province1,
      province2: _this.data.province2,
      city: _this.data.city,
      county: _this.data.county,
      check: false,
      Topping: false
    };
    list.push(obj);
    this.setData({
      data: list
    })
  },
  // 置顶
  Topping(){

  },

  // 编辑
  editContent(){

  },

  // 默认
  default(){

  }
})