const config = require('./config.js');
var COS = require('./cos-wx-sdk-v5.js');
Component({
    properties: {
        Prefix: {
            type: String, //?String
            value: [],
            observer() {
                this.initView();
            }
        },
    },
    data: {
        currentPath: [],
        canChange: true,
        root: '/',
        toView: 'menu1'
    },
    methods: {
        /**
         * Event functions
         */
        initView() {

            if (this.properties.Prefix.length != 0) {
                this.setData({
                    root: this.properties.Prefix,
                    currentPath: [
                        ...this.data.currentPath,
                        this.properties.Prefix
                    ],

                });
            }

            this.cos = new COS({
                getAuthorization: function (options, callback) {

                    wx.request({
                        url: config.serverPrefix + 'sts.php',
                        data: {
                            Method: options.Method,
                            Key: options.Key
                        },
                        dataType: 'json',
                        success: function (res) {
                            //debug msg
                            if (res.statusCode === 200 && res != undefined) {
                                console.log('getAuthorization success')
                                var data = res.data;
                                var credentials = data.credentials;
                                callback({
                                    TmpSecretId: credentials.tmpSecretId,
                                    TmpSecretKey: credentials.tmpSecretKey,
                                    XCosSecurityToken: credentials.sessionToken,
                                    ExpiredTime: data.expiredTime,
                                });
                            }
                        },
                        fail: function (res) {

                            wx.showModal({
                                title: res.errMsg,
                                content: 'Please check the network connection',
                                showCancel: false,
                                // success(res) {
                                //     if (res.confirm) {
                                //         //network setting
                                //     }
                                // }
                            })

                        }
                    });
                }
            });
            this.Render();

        },
        tapFolder(e) {
            if (this.data.canChange) {
                var currentText = e.currentTarget.dataset.text;

                this.setData({
                    canChange: false,
                    currentPath: [
                        ...this.data.currentPath,
                        currentText
                    ],
                    toView: 'menu' + this.data.currentPath.length
                });
                this.Render();
                var that = this;
                setTimeout(function () {
                    that.setData({
                        canChange: true
                    });
                }, 500);
            }
        },
        tapFile(e) {
            var currentText = e.currentTarget.dataset.text;
            var pathstr = this.data.currentPath.toString();
            pathstr = pathstr.replace(/\,/g, "") + currentText;
            var that = this;
            this.cos.getObjectUrl({
                Bucket: config.Bucket,
                Region: config.Region,
                Key: pathstr,
            }, function (err, data) {

                if (err && err.error) {
                    wx.showModal({
                        title: 'return error',
                        content: (err.error.Message || err.error) + ';statusCode:' + err.statusCode,
                        showCancel: false
                    });
                } else if (err) {
                    wx.showModal({
                        title: 'request error',
                        content: err + ';statusCode:' + err.statusCode,
                        showCancel: false
                    });
                } else if (data.Url !== null) {
                    that.triggerEvent('fileInfo', data.Url)
                }
            });
        },

        toPath(e) {
            if (this.data.canChange) {
                var currentIndex = e.currentTarget.dataset.index;
                this.setData({
                    canChange: false,
                    currentPath: this.data.currentPath.slice(0, currentIndex + 1),
                    toView: 'menu' + this.data.currentPath.length
                });
                this.Render();
                var that = this
                setTimeout(function () {
                    that.setData({
                        canChange: true
                    });
                }, 500);
            }
        },


        /**
         * Array deduplication
         * @param {*} array 
         */
        uniq(array) {
            var temp = [];
            var index = [];
            var l = array.length;
            for (var i = 0; i < l; i++) {
                if (array[i].Key.length != 0) {
                    for (var j = i + 1; j < l; j++) {
                        if (array[i].Key === array[j].Key) {
                            i++;
                            j = i;
                        }
                    }
                    temp.push(array[i]);
                    index.push(i);
                }

            }

            return temp;
        },
        /**
         * Request and render
         */
        Render() {
            var pathstr = this.data.currentPath.toString();
            pathstr = pathstr.replace(/\,/g, "");
            var that = this;
            this.cos.getBucket({
                Bucket: config.Bucket,
                Region: config.Region,
                Prefix: pathstr,
                Delimiter: ''
            }, function (err, data) {
                if (err && err.error) {
                    wx.showModal({
                        title: 'return error',
                        content: (err.error.Message || err.error) + ';statusCode:' + err.statusCode,
                        showCancel: false
                    });
                } else if (err) {
                    wx.showModal({
                        title: 'request error',
                        content: err + ';statusCode:' + err.statusCode,
                        showCancel: false
                    });
                } else if (data.statusCode === 200 && data.Contents !== null) {
                    //console.log('request success');
                    var folderList = data.Contents;
                    folderList.map(function (currentValue, index) {
                        currentValue.Key = currentValue.Key.slice(pathstr.length);
                        if (currentValue.Key.indexOf('/') != -1) {
                            currentValue.Method = 'tapFolder';
                            currentValue.Key = currentValue.Key.slice(0, currentValue.Key.indexOf('/') + 1);
                            currentValue.Type = 'folder';
                            //folder
                        } else {
                            //file
                            currentValue.Method = 'tapFile';
                            var index = currentValue.Key.lastIndexOf(".");
                            var suffix = currentValue.Key.substring(index + 1, currentValue.Key.length);
                            switch (suffix) {
                                case 'doc': case 'docx':
                                    currentValue.Type = 'word';
                                    break;
                                case 'xls': case 'xlsx': case 'csv':
                                    currentValue.Type = 'excel';
                                    break;
                                case 'pdf':
                                    currentValue.Type = 'pdf';
                                    break;
                                case 'ppt': case 'pptx':
                                    currentValue.Type = 'ppt';
                                    break;
                                case 'c': case 'cpp':
                                    currentValue.Type = 'cpp';
                                    break;
                                case 'jsp': case 'jar': case 'java':
                                    currentValue.Type = 'jar';
                                    break;
                                case 'php':
                                    currentValue.Type = 'php';
                                    break;
                                case 'py':
                                    currentValue.Type = 'code';
                                    break;
                                case 'html':
                                    currentValue.Type = 'html';
                                    break;
                                case 'css':
                                    currentValue.Type = 'css';
                                    break;
                                case 'js':
                                    currentValue.Type = 'js';
                                    break;
                                case 'zip': case 'rar': case 'tar': case 'gz': case '7z':
                                    currentValue.Type = 'zip';
                                    break;
                                case 'txt':
                                    currentValue.Type = 'txt';
                                    break;
                                case 'jpg': case 'jpeg': case 'png': case 'gif': case 'svg': case 'ico':
                                    currentValue.Type = 'img';
                                    break;
                                case 'md':
                                    currentValue.Type = 'md';
                                    break;
                                default:
                                    currentValue.Type = 'file';
                                    break;
                            }
                            //console.log(suffix + ':' + currentValue.Type);
                        }
                    });
                    folderList = that.uniq(folderList);
                    if (folderList.length === 0) {
                        wx.showToast({
                            title: 'Empty folder',
                            icon: 'none',
                            duration: 1000
                        })
                    }
                    that.setData({
                        outValue: folderList,
                    });

                    //console.log('render success');
                }


            });

        },

    }
})
