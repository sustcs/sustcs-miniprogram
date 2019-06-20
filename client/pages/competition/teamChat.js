const io = require('../../utils/weapp.socket.io.js');
const { serverUrl } = require('../../config');
const { timeago } = require('../../utils/common.js');
const app = getApp();

function msgUuid() {
  if (!msgUuid.next) {
    msgUuid.next = 0
  }
  return 'msg-' + ++msgUuid.next
}

function createSystemMessage(content) {
  return { id: msgUuid(), type: 'system', content}
}

function createUserMessage(content, user, isMe = false, time) {
  const color = getUsernameColor(user)
  return { id: msgUuid(), type: 'speak', content, user, isMe, color, time}
}
var COLORS = [
  '#e54d42',
  '#f37b1d',
  '#fbbd08',
  '#8dc63f',
  '#39b54a',
  '#1cbbb4',
  '#0081ff',
  '#6739b6',
  '#9c26b0',
  '#e03997',
  '#a5673f',
  '#8799a3',
  '#aaa',
  '#333',
  '#fff',
]

// Gets the color of a username through our hash function
function getUsernameColor(username) {
  // Compute hash code
  var hash = 7
  for (var i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + (hash << 5) - hash
  }
  // Calculate color
  var index = Math.abs(hash % COLORS.length)
  return COLORS[index]
}
Page({

  /**
   * Page initial data
   */
  data: {
    inputContent: "Hi guys, Let's talk it over",
    messages: [],
    lastMessageId: 'none',
    team: {
      id: '666666',
      name: 'RM'
    },
    isSend: false
  },
  onReady() {
    if (!this.pageReady) {
      this.pageReady = true
      //this.enter()
    }

  },

  onShow() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] === undefined || res.authSetting['scope.userInfo'] === false) {
          wx.navigateTo({
            url: '/pages/auth/index?domain=competition/teamChat&action=chat'
          })
        } else {
          if (that.pageReady && !that.socket) {
            that.enter()
          }
        }
      }
    })
  },

  onUnload() {
    this.quit()
  },

  quit() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }

    if (this.osocket) {
      this.osocket.close()
      this.osocket = null
    }
  },
  enter() {
    this.pushMessage(createSystemMessage('Logging in...'))
    // 如果登录过，会记录当前用户在 this.me 上
    if (!this.me) {
      wx.getUserInfo({
        success: res => {
          this.me = res.userInfo
          this.createConnect()
        },
      })
    } else {
      this.createConnect()
    }
  },
  updateMessages(updater) {
    var messages = this.data.messages
    updater(messages)

    this.setData({ messages })

    // 需要先更新 messagess 数据后再设置滚动位置，否则不能生效
    var lastMessageId = messages.length
      ? messages[messages.length - 1].id
      : 'none'
    this.setData({ lastMessageId })
  },
  pushMessage(message) {

    this.updateMessages(messages => messages.push(message))
  },
  amendMessage(message) {
    this.updateMessages(messages => messages.splice(-1, 1, message))
  },
  popMessage() {
    this.updateMessages(messages => messages.pop())
  },
  changeInputContent: function (e) {
    this.setData({
      inputContent: e.detail.value,
    })
  },
  sendMessage: function (e) {
    const msg = e.detail.value
    let that = this;
    if (!msg) {
      return
    }
    this.socket.emit('broadcast', {
      target: 'team',
      payload: {
        username: that.me.nickName,
        message: msg
      }
    });
    let time = new Date().toLocaleString();
    this.pushMessage(createUserMessage(msg, this.me.nickName, true, time))
    this.setData({ inputContent: null })
  },
  createConnect: function (e) {
    this.amendMessage(createSystemMessage('Joining a group chat...'))

    // const socket = (this.socket = io(
    //   serverUrl,
    // ))
    let that = this;
    const socket = (this.socket = io(
      serverUrl + 'team', {
        query: {
          room: that.data.team.id,
          username: that.me.nickName,
        },
        transports: ['websocket']
      }
    ))
    socket.on('connect', () => {
      this.popMessage()
      this.pushMessage(createSystemMessage('connect success'))
    })

    socket.on('connect_error', d => {
      this.pushMessage(createSystemMessage(`connect_error: ${d}`))
    })

    socket.on('connect_timeout', d => {
      this.pushMessage(createSystemMessage(`connect_timeout: ${d}`))
    })

    socket.on('disconnect', reason => {
      that.setData({
        isSend: false
      });
      this.pushMessage(createSystemMessage(`disconnect: ${reason}`))
    })

    socket.on('reconnect', attemptNumber => {
      this.pushMessage(
        createSystemMessage(`reconnect success: ${attemptNumber}`),
      )
    })

    socket.on('reconnect_failed', () => {
      that.setData({
        isSend: false
      });
      this.pushMessage(createSystemMessage('reconnect_failed'))
    })

    socket.on('reconnect_attempt', () => {
      this.pushMessage(createSystemMessage('reconnect_attempt'))
    })

    socket.on('error', err => {
      this.pushMessage(createSystemMessage(`error: ${err}`))
    })

    socket.on('team', d => {
      const { username, message } = d.data.payload;
      const { timestamp } = d.meta;
      if (username === that.me.nickName) {
        that.setData({
          isSend: true
        });
      } else {
        let time = timeago(timestamp);
        this.pushMessage(createUserMessage(message, username, false, time))
      }
      
    })

    socket.on('join', d => {
      console.log(d);
      if (d.username === that.me.nickName) {
        this.pushMessage(createSystemMessage(`您已加入本团队聊天，当前共有 ${d.numUsers} 人`))
      } else {
        this.pushMessage(createSystemMessage(`${d.username} 来了，当前共有 ${d.numUsers} 人`))
      }
    })

    socket.on('leave', d => {
      this.pushMessage(createSystemMessage(`${d.username} 离开了，当前共有 ${d.numUsers} 人`))
    })

    // socket.on('typing', d => { })

    // socket.on('stop typing', d => { })

    // socket.emit('add user', this.me.nickName)
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //team = request(options.teamId)
    // this.setData({
    //   team: 'RM'
    // });
  },

 
})