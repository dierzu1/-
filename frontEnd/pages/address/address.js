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
    // 模态框
    show: false,
    // 获取地址
    popup: false,
    areaList: {},
    name: "",
    tel: "",
    province1: "选择地区",
    province2: "",
    city: "",
    county: "",
    check: false,
    Topping: false,
    currentIndex: -1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(Data)
    this.setData({
      areaList: Data
    })
  },
  // 获取当前的位置
  add() {
    let show = !this.show;
    this.setData({
      show: show
    })
  }, 
  // 关闭模态框
  onClose() {
    this.setData({ show: false });
  },
  // 获取用户名
  getName(e){
    console.log(e.detail)
    this.setData({
      name: e.detail.value
    })
  },

  // 获取手机号
  getTel(e){
    
    console.log(e.detail)
    this.setData({
      tel: e.detail.value
    })
  },
  // 获取详细地址
  getCounty(e){
    console.log(e);
    this.setData({
      county: e.detail.value
    })
  },
  // 点击确认
  confirm(e){
    console.log(e)
    this.setData({
      province1: e.detail.values[0].name,
      province2: e.detail.values[1].name,
      city: e.detail.values[2].name,
      popup: false
    })
  },
  // 点击取消
  cancel(e){
    this.setData({
      popup: false,
    })
  },
  // 添加新的收获地址
  save(){
    let _this = this;
    let list = this.data.data;
    let currentIndex = this.data.currentIndex;
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
    if(this.data.currentIndex >= 0 ){//编辑
      list[currentIndex] = obj;
    }else{// 添加收货地址
      list.push(obj);
      console.log(list)
    }
    this.setData({
      data: list,
      show: false
    })
    
  },
  //获取地址模态框
  auto(){
    let popup = !this.data.popup;
    this.setData({
      popup: popup
    })
  },

  // 置顶
  Topping(e){
    let index = e.currentTarget.dataset.index;
    let list = this.data.data;
    let data = [];
    let newList = list.splice(index,1);
    if (newList[0].Topping == true){
      newList[0].Topping = false
    }else{
      newList[0].Topping = true
    }
    list.forEach(item => {
      item.Topping = false
    })
    list.unshift(...newList)
    this.setData({
      data: list
    })
  },  

  // 编辑
  editContent(e){
    console.log(e)
    let show = !this.show;
    this.setData({
      show: show
    })
    let list = this.data.data;
    let index = e.currentTarget.dataset.index;
    let newList = list[index];
    this.setData({
      name: newList.name,
      tel: newList.tel,
      province1: newList.province1,
      province2: newList.province2,
      city: newList.city,
      county: newList.county,
      check: newList.check,
      Topping: newList.Topping,
      currentIndex: index
    })
  },

  // 默认
  defaults(el){
    console.log(el)
    let index = el.currentTarget.dataset.index;
    let list = this.data.data;
    
    list.forEach((item,indexs)=> {
      if(index == indexs){
        console.log(1)
        list[indexs].check = !list[indexs].check;
      }else{
        console.log(2)
        list[indexs].check = false
      }
    })
    console.log(list[index].check)
    this.setData({
      data: list
    })
  }
})