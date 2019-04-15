const baseUrl = 'https://api.github.com';
const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}
function logError(name, action, info) {
  if (!info) {
    info = 'empty'
  }
  try {
    let deviceInfo = wx.getSystemInfoSync()
    var device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message)
  }
  let time = formatTime(new Date())
  console.error(time, name, action, info, device)
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
}
function getCurrentPageUrl() {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}
module.exports = {
  baseOptions(params, method = 'GET') {
    let { url, data } = params;
    console.log('params', params);
    let contentType = params.contentType || 'application/json';
    wx.request({
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': wx.getStorageSync('Authorization')
      },
      success(res) {
        console.log('success', res)
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          wx.setStorageSync('Authorization', '')
          let path = getCurrentPageUrl()
          if (path !== 'pages/login/login') {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          wx.setStorageSync('Authorization', '')
          let path = getCurrentPageUrl()
          if (path !== 'pages/login/login') {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
          return logError('api', '需要鉴权')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }

      },
      fail(e) {
        logError('api', '请求接口出现问题', e)
      }
    })

  },
  get(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option);
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
};