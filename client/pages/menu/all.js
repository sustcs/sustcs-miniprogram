//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    allItem: [
      {
        id: 0,
        name: "Recent",
        func: [
          {
            name: "Curriculum",
            url: "",
            info: "this is info",
            color: "red"
          },
          {
            name: "Curriculum",
            url: "",
            info: "this is info",
            color: "orange"
          },
          {
            name: "Curriculum",
            url: "",
            info: "this is info",
            color: "green"
          },
          {
            name: "Curriculum",
            url: "",
            info: "this is info",
            color: "blue"
          },
          {
            name: "Curriculum",
            url: "",
            info: "this is info",
            color: "purple"
          }
        ]
      },
      {
        id: 1,
        name: "Course"
      },
      {
        id: 2,
        name: "Subject"
      },
      {
        id: 3,
        name: "Activity"
      },
      {
        id: 4,
        name: "Others"
      }
    ]
  },

  onLoad: function() {},
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    });
  }
});
