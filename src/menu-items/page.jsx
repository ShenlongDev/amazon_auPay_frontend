// assets
import { LoginOutlined, FontColorsOutlined, DeleteRowOutlined, AppstoreAddOutlined, FileSearchOutlined, ProfileOutlined, PlusOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: '商品管理',
  type: 'group',
  children: [
    {
      id: 'item_list',
      title: '商品一覧',
      type: 'item',
      url: '/item_list',
      icon: ProfileOutlined,
      // target: true
      breadcrumbs: false
    },
    {
      id: 'item_edit',
      title: '商品登録',
      type: 'item',
      url: '/item_edit',
      icon: AppstoreAddOutlined,
      breadcrumbs: false
    },
    
    {
      id: 'item_to_view',
      title: 'IDで一覧表示',
      type: 'item',
      url: '/item_to_view',
      icon: FileSearchOutlined,
      breadcrumbs: false
    },
    {
      id: 'item_asin_del',
      title: 'ASINで削除',
      type: 'item',
      url: '/item_asin_del',
      icon: FontColorsOutlined,
      breadcrumbs: false
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
