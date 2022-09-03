export const tabBar =  {
  custom: true,
  selected:0,
  color: '#ADADAD',
  selectedColor: '#ecca0a',
  backgroundColor: '#ffffff',
  list: [
    {
      pagePath: '/pages/dynamic/index',
      selectedIconPath: '../assets/img/dynamic_select.png',
      iconPath: '../assets/img/dynamic.png',
      text: '动态'
    },
    {
      pagePath: '/pages/publish/index',
      selectedIconPath: '../assets/img/publish_new.png',
      iconPath: '../assets/img/publish_new.png',
      bulge:true
    },
    {
      pagePath: '/pages/user/index',
      selectedIconPath: '../assets/img/user_select.png',
      iconPath: '../assets/img/user.png',
      text: '我的'
    },
  ]
}
