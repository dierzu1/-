// pages/particulars/particulars.js
import Particular from './particular_module.js'
let part=new Particular();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isShow:false,
      mode:{
      },
      offSize:false,
    offColor: false,
      judge:'-1',
      allSelectData:{
          allSize:[25,23,43,22],
          allColor:['红色','白色','黑色','粉色','橙色'],
          allNum:1
      },
      currentColor:'',
      currentSize:'',
      selectAll:[{
        'image': './image/main.jpg',
        'title': '枕头',
        'colors':'',
        'sizes':'',
        'count':1,
        'price':128
      }],
      curIndex:-1
  },
  back:function (){
    //返回上一级
    wx.navigateBack({
      delta:-1
    })
  },
  toIndex:function (){
    //去首页
      wx.switchTab({
        url: '../index/index'
      })
  },
  selectSize:function (ev){
    //选择大小
    if (this.data.currentSize == ev.currentTarget.dataset.sizeindex) {
      //两次点击
      this.data.offSize = !this.data.offSize;
      this.setData({
        offSize: this.data.offSize
      })
    }else{
      this.setData({
        offSize:true
      })
    }
    this.setData({
      currentSize:ev.currentTarget.dataset.sizeindex
    }) 
     
  },
  selectColor:function (ev){
    //选择颜色
    if (this.data.currentColor == ev.currentTarget.dataset.colorindex) {
      //两次点击
      this.data.offColor = !this.data.offColor;
      this.setData({
        offColor: this.data.offColor
      })
    }else{
      this.setData({
        offColor: true
      })
    }
    this.setData({
      currentColor: ev.currentTarget.dataset.colorindex,
    })
  },
  oks:function () {
    //确定 订单
    //当前的颜色
    let crs = this.data.allSelectData.allColor[this.data.currentColor];

    //当前得尺寸
    let sis = this.data.allSelectData.allSize[this.data.currentSize];

    //details
    let curMode=this.data.mode
    //数量
    let curNum=this.data.allSelectData.allNum

   if((crs && this.data.offColor )&& (sis && this.data.offSize)){
     //如果有尺寸，数量
      //路由跳转
      if (this.data.judge=='0'){
        //发起拼单
        // let storage = wx.getStorageSync('goodList').storage;
        wx.getStorage({
          key: 'goodList',
          success: function(res) {
            res.data[0].count = curNum
            res.data[0].colors = crs
            res.data[0].sizes = sis

            wx.setStorage({
              key: 'goodList',
              data:res.data
            })
          }
        })
        // this.data.allSelectData.allNum = 1
        // this.setData({
        //   isShow: false,
        //   currentSize: '',
        //   currentColor: '',
        //   allSelectData: this.data.allSelectData
        // })
        wx.navigateTo({
          url: '../account/account?index=0'
        })
      }else if(this.data.judge=='1'){
        //单独购买
        let indexs = this.data.curIndex;
        wx.getStorage({
          key: 'cartGood',
          success: function(res) {
            let items;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].id == indexs) {
                 res.data[i].count++;
                res.data[i].colors = crs
                res.data[i].sizes = sis
              }
            }
            if(!items){
              //没有又一次选中的
              res.data[res.data.length - 1].count = curNum
              res.data[res.data.length - 1].colors = crs
              res.data[res.data.length - 1].sizes = sis
            }
            //存储
            wx.setStorage({
              key: 'cartGood',
              data:res.data
            })
          }
        })
        wx.switchTab({
          url: '../cart/cart?index=1'
        })

      }
   }else{
     console.log('请选择尺寸，大小')
   }
    
  },
  remove:function (){
    //数量减减
    if(this.data.allSelectData.allNum<=1){
      this.data.allSelectData.allNum=1;
     
    }else{
      this.data.allSelectData.allNum--
    }
    this.setData({
      allSelectData: this.data.allSelectData
    })
  },
  add:function (){
    //数量加加
    this.data.allSelectData.allNum++
    this.setData({
      allSelectData: this.data.allSelectData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求数据
    part.particulars((res)=>{
      this.setData({
        mode:res.data.data.goods
      })
    },options.id)
    this.setData({
      curIndex:options.id
    })
  },
  shows:function (el){
    //单独购买 发起拼单
    //获取index 判断是点击的谁
    this.setData({
      judge:el.currentTarget.dataset.index
    })
    //点击单独购买
    this.setData({
      isShow: true
    })
    let modes = this.data.mode;
    let indexs = this.data.curIndex;
    if(el.currentTarget.dataset.index=='0'){
      //发起拼单
      //存储img title price
        wx.setStorage({
          key: 'goodList',
          data: [
            {
              image: modes.goods_thumb,
              title: modes.goods_name,
              price: modes.shop_price,
              id: modes.goods_id
            }
          ]
        })
    } else if (el.currentTarget.dataset.index == '1'){
      //单独购买 去购物车
      if (wx.getStorageSync('cartGood')) {
        //如果有数据
        //let indexs = this.data.curIndex;
        wx.getStorage({
          key: 'cartGood',
          success: function(res) {
            let items;
            for(let i=0;i<res.data.length;i++){
              if(res.data[i].id==indexs){
                items=res.data[i]
              }
            }
            if(!items){
              res.data.push({
                image: modes.goods_thumb,
                title: modes.goods_name,
                price: modes.shop_price,
                checked: false,
                id: modes.goods_id
              })
            }
            wx.setStorage({
              key: 'cartGood',
              data:res.data
            })
          }
        })
      } else {
        //如果没有
        wx.setStorage({
          key: 'cartGood',
          data:[{
            image: modes.goods_thumb,
            title: modes.goods_name,
            price: modes.shop_price,
            checked: false,
            id: modes.goods_id
          }]
        })
      }
    }
  },

  noShow:function (){
    //关闭    
   // this.data.allSelectData.allNum=1
    this.setData({
      isShow:false,
      // currentSize:'',
      // currentColor:'',
      // allSelectData: this.data.allSelectData
    })
    if (this.data.judge=='0'){
      //发起拼单
     // wx.removeStorageSync('goodList')

    }else if(this.data.judge=='1'){
     wx.getStorage({
       key: 'cartGood',
       success: function(res) {
        res.data.splice(res.data.length-1,1)
        wx.setStorage({
          key: 'cartGood',
          data: res.data
        })
       }
     })
    }
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})