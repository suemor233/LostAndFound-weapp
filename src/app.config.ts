
export default {
  pages: ["pages/dynamic/index","pages/publish/index","pages/my/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/dynamic/index',
        selectedIconPath: 'assets/img/dynamic_select.png',
        iconPath: 'assets/img/dynamic.png',
        text: '动态'
      },
      {
        pagePath: 'pages/publish/index',
        selectedIconPath: 'assets/img/publish_select.png',
        iconPath: 'assets/img/publish.png',
        text: '发布'
      },
      {
        pagePath: 'pages/my/index',
        selectedIconPath: 'assets/img/my_select.png',
        iconPath: 'assets/img/my.png',
        text: '我的'
      },
    ]
  }
};
