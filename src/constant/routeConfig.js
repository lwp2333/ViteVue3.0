export default [
  {
    id: '101',
    title: '示例中心',
    path: '/main/userCenter',
    isLeaf: false,
    slots: {
      icon: 'icon'
    },
    iconType: 'icon-bangbangmangmdpi',
    children: [
      {
        id: '101-1',
        title: '表单',
        path: '/main/userCenter/form',
        isLeaf: true,
        slots: {
          icon: 'icon'
        },
        iconType: 'icon-linliquanmdpi',
        children: []
      },
      {
        id: '101-2',
        title: '地图',
        path: '/main/userCenter/amap',
        isLeaf: true,
        slots: {
          icon: 'icon'
        },
        iconType: 'icon-yijianfankuimdpi',
        children: []
      },
      {
        id: '101-3',
        title: '表格',
        path: '/main/userCenter/table',
        isLeaf: true,
        slots: {
          icon: 'icon'
        },
        iconType: 'icon-shequjiankang',
        children: []
      },
      {
        id: '101-4',
        title: 'Hooks',
        path: '/main/userCenter/hooks',
        isLeaf: true,
        slots: {
          icon: 'icon'
        },
        iconType: 'icon-shequshangcheng',
        children: []
      },
      {
        id: '101-5',
        title: '组件',
        path: '/main/userCenter/component',
        isLeaf: true,
        slots: {
          icon: 'icon'
        },
        iconType: 'icon-shequxiaozhan',
        children: []
      },

      {
        id: '101-6',
        title: '视图切换',
        path: '/main/userCenter/tagView',
        isLeaf: true,
        slots: {
          icon: 'icon'
        },
        iconType: 'icon-xiangmuxinxi',
        children: []
      }
    ]
  },
  {
    id: '102',
    title: '配置中心',
    path: '/main/settingCenter',
    isLeaf: false,
    slots: {
      icon: 'icon'
    },
    iconType: 'icon-chengjiechayan',
    children: [
      {
        id: '102-1',
        title: '菜单配置',
        path: '/main/settingCenter/routeConfig',
        isLeaf: true,
        slots: {
          icon: 'icon'
        },
        iconType: 'icon-lvzhi12',
        children: []
      },
      {
        id: '102-2',
        title: '测试多层',
        path: '/main/settingCenter/routeConfig',
        isLeaf: false,
        slots: {
          icon: 'icon'
        },
        iconType: 'icon-baoshibaoxiu',
        children: [
          {
            id: '102-2-1',
            title: '测试多层-1',
            path: '/main/settingCenter/test-1',
            isLeaf: false,
            slots: {
              icon: 'icon'
            },
            iconType: 'icon-daishoubaoguo',
            children: [
              {
                id: '102-2-1-1',
                title: '测试多层-1-1',
                path: '/main/settingCenter/test-1-1',
                isLeaf: false,
                slots: {
                  icon: 'icon'
                },
                iconType: 'icon-zhuangxiubeianmdpi',
                children: [
                  {
                    id: '102-2-1-1-1',
                    title: '测试多层-1-1-1',
                    path: '/main/settingCenter/test-1-1-1',
                    isLeaf: true,
                    slots: {
                      icon: 'icon'
                    },
                    iconType: 'icon-yijianfankuimdpi',
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
