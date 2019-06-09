// 云函数入口文件
const cloud = require('wx-server-sdk')
var request = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  cloud.init({
    env: 'test-728bbc'
  });
  var options = {
    method: 'GET',
    url: encodeURI(event.url),
    headers: event.headers,
    json: true,
  };
  const resultValue = await request(options);
  return resultValue
}