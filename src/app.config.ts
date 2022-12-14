export default {
  pages: [
    'pages/dynamic/index',
    'pages/dynamic/detail/index',
    'pages/dynamic/search/index',
    'pages/publish/lost/index',
    'pages/publish/index',
    'pages/publish/seek/index',
    'pages/user/index',
    'pages/user/setting/index',
    'pages/user/management/index',

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFE33F',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    color: '#ADADAD',
    selectedColor: '#ecca0a',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/dynamic/index',
        selectedIconPath: 'assets/img/dynamic_select.png',
        iconPath: 'assets/img/dynamic.png',
        text: '动态',
      },
      {
        pagePath: 'pages/publish/index',
        selectedIconPath: 'assets/img/publish_new.png',
        iconPath: 'assets/img/publish_new.png',
        text: '发布',
      },
      {
        pagePath: 'pages/user/index',
        selectedIconPath: 'assets/img/user_select.png',
        iconPath: 'assets/img/user.png',
        text: '我的',
      },
    ],
  },
}
