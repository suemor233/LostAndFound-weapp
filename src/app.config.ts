
export default {
  pages: ["pages/dynamic/index","pages/publish/lost/index","pages/publish/index","pages/publish/seek/index","pages/user/index",],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#FFE33F",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: '#ADADAD',
    selectedColor: '#ecca0a',
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
        pagePath: 'pages/user/index',
        selectedIconPath: 'assets/img/user_select.png',
        iconPath: 'assets/img/user.png',
        text: '我的'
      },
    ]
  }
};
