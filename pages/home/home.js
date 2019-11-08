import { Theme } from "../../model/theme";
import { Banner } from "../../model/banner";

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.initAllData()
    const data = await Theme.getHomeLocationA()
    this.setData({
      topTheme: data[0]
    })
  },
  async initAllData(){
    const themeA =await Theme.getHomeLocationA()
    const bannerB =await Banner.getHomeLocationB()
    this.setData({
      themeA:themeA[0],
      bannerB
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