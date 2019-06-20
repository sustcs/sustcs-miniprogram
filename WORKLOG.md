# Change log
- 2019-4-8 
  完成课程逻辑原型设计及页面实现
- 2019-4-13 
  完成资料页的设计，重新选型
- 2019-4-15 
  完成资料页github基本
- 2019-4-16 
  完成github接口完善
  - [x] share、pulldown、search
  - [x] 模态框侧边抽屉顶部遮罩
  - [x] 顶部cu-costom

- 2019-4-17
  请求git缓慢,开发者工具可正常获取
- 2019-4-18
  重构github请求模式:云函数做API消息转发,需要优化加载体验
- 2019-4-19 
  竞赛页面流程设计，[图示](https://www.processon.com/view/link/5c933874e4b0ab74ece0ce00)
- 2019-4-22
  - 修复github中文路径解析错误 ``encodeURIComponent``
  - 修复自定义图标乱码 [参考](https://www.yuque.com/colorui/column/kpeid8)

- 2019-4-24
  背景虚化导致子节点图片虚化
- 2019-4-25 
  重新分析赛事业务

# Tools
- 配色　[CoolHue 2.0](https://webkul.github.io/coolhue/)
- 测试　[testin](https://www.testin.cn/)
- 小程序图表
  - [wx-charts](https://github.com/xiaolin3303/wx-charts)
  需要roll-up编译
  - [ECharts](https://github.com/ecomfe/echarts-for-weixin)
  - [f2](https://github.com/antvis/wx-f2)
  需要npm支持

- 问卷解决方案
  - [问卷网开放接口](https://www.wenjuan.com/open/v3)
  需要申请
  - [金数据插件](https://jinshuju.net/features/miniapp)
  都是直接拉取后台题库，需要在后台先建立起来题库
  
- JavaScript environment 
  node [notebook](https://runkit.com)
- terminal browser [w3m](http://www.w3m.org/)
- socket [wechat socket](http://weappsocket.matong.io/)
- 小程序监控：　[听云](https://doc.tingyun.com/mp/)