/*
 * @Author: liuling 
 * @Date: 2019-11-14 14:48:12 
 * @Last Modified by: liuling
 * @Last Modified time: 2019-11-19 17:13:13
 */
import { Theme } from "../../model/theme";
import { Banner } from "../../model/banner";
import { Category } from "../../model/category";
import { Activity } from "../../model/activity";

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    themeF: null,
    themeH: null,
    bannerB:null,
    bannerG:null,
    grid: [],
    activity:null,
    themESpuList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.initAllData()
  },
  async initAllData(){
    //声明一个Theme实例对象  对象可以保存状态  类只可保存数据
    const theme =new Theme()
    await theme.getThemes()

    const themeA = await theme.getHomeLocationA()
    const themeE = await theme.getHomeLocationE()
    //
    let themeESpu = []
    if(themeE.online){
      const data =await  Theme.getHomeLocationESpu()
      if(data){
        themeESpu = data.spu_list.slice(0,8)//slice() 从数组中选择一个区间的元素
      }
    }
    const themeF = await theme.getHomeLocationF()
    const themeH = await theme.getHomeLocationH()
   
    const bannerB =await Banner.getHomeLocationB()
    const grid =await Category.getHomeLocationC()
    const activity = await Activity.getHomeLocationD()
    const bannerG =await Banner.getHomeLocationG()
    this.setData({
      themeA,
      themeE,
      themeESpu,
      themeF,
      themeH,
      bannerB,
      bannerG,
      grid,
      activity
    })
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