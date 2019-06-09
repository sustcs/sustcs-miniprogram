- ## 2019-1-4
  npm install pm2@latest -g
- ## 2019-1-5
  SELECT CONCAT('drop table ',table_name,';') FROM information_schema.`TABLES` WHERE table_schema='mysql';
  无法删除seahub-db

  select concat( 'drop table ',group_concat(table_name) , ':' ) as statement from information_schema.tables where table_schema = 'seahub-db';

  文档不一致
  启动无法打开

  [### VirtualBox Cannot register the hard disk already exists](http://www.webdesignblog.asia/software/virtualbox-moving-vdi-file-re-linking-guest/)

  Permission denied (publickey).
  更改sysnced_folder

  七牛云样式

  composer慢，国内镜像
  composer config -g repo.packagist composer https://packagist.laravel-china.org
  新建项目composer create-project laravel/laravel Laravel --prefer-dist "5.7.*"
- ## 2019-1-6
  vagrant 固定内网IP
  config.vm.network "public_network",会DHCP分配，而SUST会间断性变化
  config.vm.network "public_network", ip: "192.168.1.120" 不可达
  https://www.vagrantup.com/docs/networking/public_network.html无效

  config.vm.synced_folder后无法ssh
  Permission denied (publickey).

  local test
  git ssh 同样错误


  homestead可访问
  laravel不可访问到内容

  file_get_contents(/var/www/hello_laravel/.env): failed to open stream: No such file or directory
  真没有，是由于homestead上传git时的
  The following paths are ignored by one of your .gitignore files:
  .env
  那么gitignore是如何起作用呢，先将其中没有声明的上传，再将其本身上传

  刚clone会白屏
  chmod -R 775 /var/www/laravel/storage 无效
  chown -R :www-data /var/www/hello_laravel 无效(服务器关键)
  composer install 成功

  https://www.codecasts.com/

  node版本不一致 node.org无法访问
  http://www.worldwarner.com/m/view.php?aid=29733
- ## 2019-1-7
  命令行翻译工具
  translate shell
  dict cli
- ## 2019-1-10
  同步文件夹至测试环境，站点没有权限写入
  更改本地权限
- ## 2019-1-19
  ### Presentations
  - [Remark](https://remarkjs.com/) ([GitHub project](https://github.com/gnab/remark)) 
  - [Cleaver](http://jdan.github.io/cleaver/) ([GitHub project](https://github.com/jdan/cleaver)). 
  `Err:Hexo doesn't support Footnotes`
  npm install hexo-reference --save

  [install docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

  [Linux 上安装 Node.js 需要安装 Python 2.6 或 2.7 ，不建议安装 Python 3.0 以上版本?](http://www.runoob.com/nodejs/nodejs-install-setup.html)

  [asciinema](https://asciinema.org)

- ## 2019-1-20
  [genymotion](https://www.genymotion.com/fun-zone/)
  https://pentester.land/tips-n-tricks/2018/10/19/installing-arm-android-apps-on-genymotion-devices.html
  anbox
- ## 2019-1-21
  [我们都知道 Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能。](http://www.runoob.com/nodejs/nodejs-process.html)

  ### front
  react->taro
  ### back
  node ->egg

  coding pages ,无样式
- ## 2019-1-23
  0.1 + 0.2 = 0.30000000000000004
  0.1 + 0.7 = 0.7999999999999999

  + '10.2abc' //err
  parseInt('10.2abc') //10.2

  UTF-8 & UTF-16(js Strings)
  Boolean(" ") //true
  Boolean("") //false

  starting with ECMAScript 2015, `[let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)` and `[const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)` declarations allow you to create block-scoped variables.


  '3' + 4 + 5;  // "345"
  3 + 4 + '5'; // "75"

  123 == '123' //true
  123 === '123' //false

  for (let value of array) & for (let value of array)
- ## 2019-1-24
  [ECMAScript® 2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/index.html)
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript
  var a = ['dog', 'cat', 'hen'];
  a[100] = 'fox';
  a.length; // 101
  a[99] //undefined

   [`for`...`in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in "/en/JavaScript/Reference/Statements/for...in") loop, however this does not iterate over the array elements, but the array indices. Furthermore, if someone added new properties to `Array.prototype`, they would also be iterated over by such a loop. Therefore this loop type is not recommended for arrays.


  a.toString & a.toLocalString
  element & component & template

  Immediately Invoked Function Expression

  var fullName = s.fullName;

  apply() & call()


  ``egg-init egg-example --type=simple``
  ``npm i egg-bin --save-dev``

- ## 2019-1-25
  express -> koa ->egg
  grunt ,gulp --->webpack ->parcel
  [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
  Using Watch Mode 本地可以，虚拟机不可以

  Hot Module Replacement:保存后自动更新显示，输出变更日志
  ESM module
- ## 2019-1-26
  glup ->webpack->parcel
  node(http)->express->koa->egg
  DRY
- ## 2019-3-5
  云函数
  `504005`

  ```js
  //client/app.js
  wx.cloud.init({
    env: "test-728bbc" //环境id在控制台才能看到
  });
  ```
- ## 2019-3-10
  
  ## 问题
  pm2安装npm install pm2@latest -g
  测试号重复回复

  <!-- more -->


  ## 步骤
  开发配置验证域名下token,公众号内回复固定内容
  - nodejs:https://cloud.tencent.com/developer/labs/lab/10196
  - python:https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1472017492_58YV5
  - php:https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319

- ## 2019-3-15
  `404011 504002`
  code2Session 在服务端调用
- ## 2019-3-16
  
- ## 2019-4-8 
  完成课程逻辑原型设计及页面实现
- ## 2019-4-13 
  完成资料页的设计，重新选型
- ## 2019-4-14 
  # 1 云存储
  只提供了上传、下载、删除、临时链接简单的针对性接口，如果实现文件管理，还需要借助云数据库。  

  <!-- more -->

  # 2 腾讯云COS对象存储
  ## 2.1 基本过程
  ### 2.1.1 初始化

  前端（小程序端）通过wx.reauest向后端(php)发起请求计算签名，后端(php)携带SecretId和SecretKey向官方发起请求获取临时密钥计算出签名返回给前端（小程序端）。小程序端初始化一个cos实例，可以通过getBucket接口获取bucket内的资源信息。
  ### 2.1.2 接口调用
  #### 2.1.2.1 调用一次getBucket，获取当前全部object信息（Key,LastModified）
  然而实际并不是这样，接口对单次请求返回的最大条目数量有限制（1000），意味着如果bucket内对象上升到一定数量，需要多次调用此接口，那么就需要判断出何时结束调用，可以通过计数如果本次返回数目小于1000，即可结束。
  这样做后，需要手动对返回对象列表进行处理，因为既包含了所有文件的路径信息，也包含了所有文件夹的信息，需求是按照树型的文件结构展示，就需要将这些条目信息按照多维的数组存储（列表标准化），目前并没有设计出高效的算法。
  ##### 优点
  - 减少网络请求
  - 每个对象具有唯一的标志（Key）以及时间信息

  ##### 缺点
  - 对象数目上升时获取到大量信息（相对当前属于多余信息），不能实现按需加载
  - 数据可能不实时同步

  #### 2.1.2.2 按需调用getBucket(通过前缀匹配prefix和定界符delimiter)
  这样做会使请求结果越来越趋近于实际需求，而后一次请求是前一次请求的子集，请求过程中需要记录当前的访问路径信息，以便在下次请求时作为前缀匹配。需要获取到当前对象列表后进行剔除下一级及之后的条目（列表标准化）。最终通过getObjectUrl获取对象信息，目前的API只能获取到文件URL,且此URL由于自带临时签名不能作为唯一标志，除非在上一级getBucket信息时保存下来。
  ##### 优点
  - 实现逻辑简单
  - 具备实时性

  ##### 缺点
  - 多次网络请求，依赖网络环境
  - 请求结果重叠，请求后的数据没有及时利用

  为了加强体验，在获取到对象列表后，根据条目的特征匹配对应的图标。
  ## 2.2 封装组件
  ### 2.2.1 树型组件
  #### 2.2.1.1 过程
  - 参照windows文件管理器，分为顶部地址栏和下方目录栏。组件对外的属性为入口地址，便于实现从特定页到对应资料页。
  - 对属性添加监听器ininView，实现调用组件时即进行首次请求接口事件。
  - 点击栏目后，触发请求接口事件，分别更新地址和目录信息。
  - 由于地址栏目需要支持路径选择，则其字段为数组类型，点击后触发新的请求接口事件。
  - 为了防止快点击和重复点击，添加了事件锁。
  - 顶部地址栏由于无法预计的补充长度，换用scrollView，并设置scroll-into-view为当前地址的最后一项

  #### 2.2.1.2 样式问题
  微信对自定义组件有一个特殊要求
  {% note warning %}
  注意：在组件wxss中不应使用ID选择器、属性选择器和标签名选择器。
  {% endnote %}
  这样的要求当然是基于隔离样式、使组件更独立的考虑。于是不能再使用原有页面样式，开发中断，转去调样式。
  ### 2.2.2 图标组件
  #### 2.2.2.1 图标来源
  使用[阿里巴巴矢量图标库](https://www.iconfont.cn),图标使用font class方式引入。
  1. 直接挑选合适的图标svg（也可自行设计svg）下载，导入到图标项目内；
  2. 构建完成后下载，使用其中的iconfont.css放入组件的样式文件中

  #### 2.2.2.2 图标匹配
  在对列表标准化时直接判断当前类型并写入Type值。
  判断当前类型由于目前图标库覆盖面小，大致是模糊匹配，后续图标库完整后将图标与文件后缀一致化直接匹配。

  #### 2.2.2.3 图标色彩问题
  由于使用font class方式，图标默认为黑色，需要按需手动在组件引用处写入color属性内，也可直接固定补充在组件样式内。
  ### 2.2.3 组件通信
  #### 2.2.3.1 组件内数据传入页面
  组件获取到文件地址信息后，需要传入页面以进行后续操作（wx.openDocument）。
  在自定义组件的内部添加事件，在事件函数内使用triggerEvent，将需要传出的数据与页面事件bind:event绑定，在页面调用组件时绑定该组件事件，页面事件内即可通过组件事件的触发获取到数据。
  ### 2.2.4 文件详情页
  需求：
  - 上传者
  - 修改时间
  - 下载量
  - 大小
  - 评价
  - 下载 :小文件支持下载预览，大文件返回临时外部下载链接
  - 预览打开

  ## 2.3 总结
  - cos不适合作为当前资料库需求的解决方案，目前github上关于高校课程的资料分享关注度持续上升，正在考虑此方式。
  - 微信小程序原生开发的痛点在于，官方在设计时并没有通盘考虑，而总感觉是打补丁，让本身就需要并行关注多个文件的开发增添了很多考虑。且文档缺乏系统整理，内容详略欠妥，概念缺乏区分，目录内容重复不易查阅，文档系统加载体验也较差。于是便随之衍生多种多样的库，多种多样的商业模式和生态链上下游，当初微信公众号便是如此，似乎有意不去做完善功能，有意在拓展更多业务。孰优孰劣？

  # 3 github
  此方式API丰富(官网文档加载龟速)，操作简便且多样化。由于公开，可能面临莫须有的教学资料版权和使用问题。
  对接口调用有限制
  {% note warning %}
  For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.
  {% endnote %}
  而微信对页面栈也有限制
  {% note warning %} 
  The current page path can only have a maximum of 10 layers.
  {% endnote %}
  这样的话就不便于采用每次根据目录访问接口并navigateTo，解决方案是获取github授权，在小程序端数据直接覆盖更新，设置路径栏，方便自由选择。
  ## 3.0 文档加载过慢
  既然
  {% note info no-icon%}
  We have recently completed a milestone where we were able to drop jQuery as a dependency of the frontend code for GitHub.com. This marks the end of a gradual, years-long transition of increasingly decoupling from jQuery until we were able to completely remove the library. In this post, we will explain a bit of history of how we started depending on jQuery in the first place, how we realized when it was no longer needed, and point out that—instead of replacing it with another library or framework—we were able to achieve everything that we needed using standard browser APIs.
  {% endnote%}
  那么
  ![](https://blog-cdn.makergyt.com/static/images/fetch_github.png)
  如何解释，这也正是迟迟无法加载的原因之一。
  ## 3.1 授权
  github大致有三种授权方式，
  - Basic authoriazition
  直接授权，传入base64编码的账号和密码(登录成功后缓存到本地)参数，下次请求API在header中携带此参数
  - token
  由用户自发生成，同样缓存到本地，下次请求携带
  - oauth2.0
  由于小程序处于较为封闭的环境，而个人账号又不支持webView，因此无法引导用户授权

  授权完成后，每小时请求API的次数限制由60升级为5000
  *未完待续*

  # Reference
  <small>
  [1] 微信公众平台.小程序开发-云开发-存储API[EB/OL].https://dwz.cn/LAhpCnIf .2019
  [2] 腾讯云.对象存储接口文档[EB/OL].https://cloud.tencent.com/document/product/436/12260 .2019
  [3] 前端[色色].微信小程序——自定义图标组件[EB/OL].https://www.cnblogs.com/sese/p/9765344.html .2018
  [4] Engineering.Removing jQuery from GitHub.com frontend[EB/OL].https://github.blog/2018-09-06-removing-jquery-from-github-frontend/ .2018
  </small>
- ## 2019-4-15 
  完成资料页github基本
- ## 2019-4-16 
  完成github接口完善
  [渐变配色](https://webkul.github.io/coolhue/)
  - [x] share、pulldown、search
  - [x] 模态框侧边抽屉顶部遮罩
  - [x] 顶部cu-costom

- ## 2019-4-17
  请求git缓慢,开发者工具可正常获取
- ## 2019-4-18
  组件化的好处在于，对于一些列表渲染的数据，可以做细致的处理，而原先必然要考虑获取数据列表再更新数据列表的情况
  重构github请求模式:云函数做API消息转发,需要优化加载体验
- ## 2019-4-19 
  竞赛页面流程
  - 赛事列表
    - 赛事详情
      - 日程表
      - 往届资料
      - 留言问题
      - 报名
        - 完善个人资料（个人页）
        - 发起组队
          - 需要的角色
          - 个人名片（个人页）
          - 联系方式
        - 队伍列表
          - 队伍详情
          - 加入队伍
          - 交换微信
  - 个人页
    - 参赛经历
    - 擅长角色
    - 发起的队伍
  小程序内部业务可以通过云开发数据库实现，尽可能业务在小程序端直接数据更新

- ## 2019-4-22
  进度安排
- ## 2019-4-23
  云存储与云数据库只适用于基本固定的小型业务，内容由用户侧生成
  github中文路径解析错误 ``encodeURIComponent``
  [testin](https://www.testin.cn/)
  自定义图标乱码 https://www.yuque.com/colorui/column/kpeid8
  水平滚动
  搜索，异步筛选 | 数据库搜索
- ## 2019-4-24
  背景虚化导致子节点图片虚化
  
  小程序图表
  - [wx-charts](https://github.com/xiaolin3303/wx-charts)
    需要roll-up编译
  - [ECharts](https://github.com/ecomfe/echarts-for-weixin)

  - [f2](https://github.com/antvis/wx-f2)
    需要npm支持

  组队
  - 建立社交
  - 组队报名
  赛事分为两类，一类是提供公开的报名通道，接受学生直接报名，此类不能也不必做报名信息的收集，大部分的需求集中于如何找到合适的队员，依赖于搭建社交平台
  另一类是不提供面向学生的报名通道，一般要以学校为参赛单位，需要经过一系列校内选拔，此类可以做信息的收集，但是信息项不一致

  问卷解决方案
  - [问卷网开放接口](https://www.wenjuan.com/open/v3)
  需要申请
  - [金数据插件](https://jinshuju.net/features/miniapp)
  都是直接拉取后台题库，需要在后台先建立起来题库
  - 外链其他小程序
  
  需要支持本地创建，也能扫码登录管理后台创建，数据同步
  组件已删除，仍会报更新？

- # 2019-4-26
  node [notebook](https://runkit.com)
  terminal [browser](http://www.w3m.org/)

- # 2019-5-8 
  [wechat socket](http://weappsocket.matong.io/)

  # 2019-5-29
  小程序监控：　[听云](https://doc.tingyun.com/mp/)