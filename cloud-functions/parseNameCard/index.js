// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const imgClient = new ImageClient({
  AppId,
  SecretId,
  SecretKey,
});
// 云函数入口函数
exports.main = async (event) => {
  const idCardImageUrl = event.url;
  const result = await imgClient.ocrBizCard({
    data: {
      url_list: [idCardImageUrl],
    },
  });
  return JSON.parse(result.body).result_list[0];
}