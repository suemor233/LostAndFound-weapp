import { PATH } from '@/constants/path';

export const dropList = [
  {
    title: '捡到物品',
    subtitle: '当我捡到了他人的物品',
    icon: 'https://y.suemor.com/imagespublish-seek.png',
    backgroundColor: '#FFF3EE',
    width: 40,
    url:PATH.PUBLISH_SEEK
  },
  {
    title: '丢失物品',
    subtitle: '当我丢失了自己的物品',
    icon: 'https://y.suemor.com/imagespublish-lost.png',
    backgroundColor: '#FFF3DE',
    width: 40,
    url:PATH.PUBLISH_LOST
  },
  {
    title: '我的发布',
    subtitle: '我发布和丢失的物品',
    icon: 'https://y.suemor.com/imagespublish-user2.png',
    backgroundColor: '#FFE33F',
    width: 35,
    url:PATH.USER_MANAGEMENT
  },
]
