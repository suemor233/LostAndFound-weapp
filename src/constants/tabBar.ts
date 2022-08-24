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
      selectedIconPath: '../assets/img/publish_select.png',
      iconPath: '../assets/img/publish.png',
      text: '发布'
    },
    {
      pagePath: '/pages/my/index',
      selectedIconPath: '../assets/img/my_select.png',
      iconPath: '../assets/img/my.png',
      text: '我的'
    },
  ]
}
