// pages/competition/teamBuild.js
Page({

  /**
   * Page initial data
   */
  data: {
    team: {
      name: 'Houston Rockets',
      id: '666666',
      member: [
        {
          name: 'John',
          avatar: '',
          role: 'captain',
          academy: '经管学院金融',
          joinTime: '2018-5-9',
          phone: '18866889788',

        },
        {
          name: 'Mike',
          avatar: '',
          role: '会计',
          academy: '电信学院网络',
          joinTime: '2018-5-１０',
          phone: '18866889788',
        }
      ]
    },
    index: null,
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  formSubmit(e) {
    console.log(e.detail.value);
    if(e.detail.value.name === '') {
      wx.showModal({
        title: 'Failed',
        content: 'What do you seem to have forgotten',
        showCancel: false
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
    
  }
})