//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        courseList: [
            {
                id: 1,
                grade: "freshman",
                list: [
                    {
                        icon: "myfill",
                        name: "Computer",
                        url: "introduce"
                    },
                    {
                        icon: "questionfill",
                        name: "Network",
                        url: "introduce"
                    },
                    {
                        icon: "discoverfill",
                        name: "Date structure",
                        url: "introduce"
                    }
                ]

            },
            {
                id: 2,
                grade: "sophomore",
                list: [
                    {
                        icon: "myfill",
                        name: "Operate system",
                        url: "introduce"
                    },
                    {
                        icon: "questionfill",
                        name: "Algorithm",
                        url: "introduce"
                    },
                    {
                        icon: "discoverfill",
                        name: "C/C++",
                        url: "introduce"
                    }
                ]

            }
        ],
    },

    onLoad: function () { }
});
