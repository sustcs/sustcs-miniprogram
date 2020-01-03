# Shaanxi university of science and technology computer science
- client: [sustcs-miniprogram](https://github.com/sustcs/sustcs-miniprogram)
- admin: [sustcs-admin](https://github.com/sustcs/sustcs-admin)
- back_end api server: [sustcs-api](https://github.com/sustcs/sustcs-api)
- oauth server: [sustcs-oauth](https://github.com/sustcs/sustcs-oauth)

Please refer to the [wiki](https://github.com/sustcs/sustcs-miniprogram/wiki) for more
# 1 Start
Wechat Developer Tool: import root
## 1.1 config
```js
// project.config.json
"appid": "", // not test
```
client/config.js
```js
// client/config.js
// github
basic_url: 'https://api.github.com/repos/',
repo_full_name: 'sustcs/course',
// cos (deprecated)
serverPrefix: '',
Bucket: 'wechat-1256701454',
Region: 'ap-chengdu',
// server
serverUrl: "http://localhost:7001/", // api server
oauthUrl: "https://oauth.test.makergyt.com/", // oauth server
domainPrefix: ["http://localhost:8000/"], // admin domain
```
## 1.2 upload and install dependencies
# 2 Screenshot
|Home|Menu|Course|Course Review|Competition|Competition Detail|
|--|--|--|--|--|--|
|![](https://raw.githubusercontent.com/sustcs/sustcs-miniprogram/master/sustcs-miniprogram-Picture1.png)|![](https://raw.githubusercontent.com/sustcs/sustcs-miniprogram/master/sustcs-miniprogram-Picture2.png)|![](https://raw.githubusercontent.com/sustcs/sustcs-miniprogram/master/sustcs-miniprogram-Picture3.png)|![](https://raw.githubusercontent.com/sustcs/sustcs-miniprogram/master/sustcs-miniprogram-Picture4.png)|![](https://raw.githubusercontent.com/sustcs/sustcs-miniprogram/master/sustcs-miniprogram-Picture5.png)|![](https://raw.githubusercontent.com/sustcs/sustcs-miniprogram/master/sustcs-miniprogram-Picture6.png)|
# 3 Finished
- [ ] introduction
- [ ] team chat
- [ ] github Api
