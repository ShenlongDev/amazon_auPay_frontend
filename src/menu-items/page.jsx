// assets
import { LoginOutlined, FontColorsOutlined, DeleteRowOutlined, AppstoreAddOutlined, FileSearchOutlined, ProfileOutlined, PlusOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: '商品管理',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: '商品登録',
      type: 'item',
      url: '/login',
      icon: AppstoreAddOutlined,
      target: true
    },
    {
      id: 'login1',
      title: '商品一覧',
      type: 'item',
      url: '/login',
      icon: ProfileOutlined,
      target: true
    },
    {
      id: 'login1',
      title: '商品コードで一覧表示',
      type: 'item',
      url: '/login',
      icon: FileSearchOutlined,
      target: true
    },
    {
      id: 'login1',
      title: 'ASINで商品一括削除',
      type: 'item',
      url: '/login',
      icon: FontColorsOutlined,
      target: true
    },
    
    // {
    //   id: 'login1',
    //   title: 'ログアウト',
    //   type: 'item',
    //   url: '/login',
    //   icon: LoginOutlined,
    //   target: true
    // },
  //   {
  //     id: 'register1',
  //     title: '新規登録',
  //     type: 'item',
  //     url: '/register',
  //     icon: icons.ProfileOutlined,
  //     target: true
  //   }
  ]
};

export default pages;
