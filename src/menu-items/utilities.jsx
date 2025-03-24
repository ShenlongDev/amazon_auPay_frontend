// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  AccountBookOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  UsergroupDeleteOutlined,
  TranslationOutlined,
  FileGifOutlined,
  UserOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';


// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: '設定管理',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: '価格設定',
      type: 'item',
      url: '/price_edit',
      icon: AccountBookOutlined,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: '除外ワード設定',
      type: 'item',
      url: '/exclude_words',
      icon: BgColorsOutlined,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'ホワイトASIN設定',
      type: 'item',
      url: '/white_asin_set',
      icon: TranslationOutlined,
      breadcrumbs: false
    }
    ,
    {
      id: 'util-shadow',
      title: 'ブラック購入者設定',
      type: 'item',
      url: '/black_buyer_set',
      icon: UsergroupDeleteOutlined,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: '装飾画像設定',
      type: 'item',
      url: '/Img_set',
      icon: FileGifOutlined,
      breadcrumbs: false
    } ,
    // {
    //   id: 'util-shadow',
    //   title: 'アカウント設定',
    //   type: 'item',
    //   url: '/shadow',
    //   icon: UserOutlined
    // }
  ]
};

export default utilities;
