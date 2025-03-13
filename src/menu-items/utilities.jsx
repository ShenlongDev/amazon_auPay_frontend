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
      url: '/typography',
      icon: AccountBookOutlined
    },
    {
      id: 'util-color',
      title: '除外ワード設定',
      type: 'item',
      url: '/color',
      icon: BgColorsOutlined
    },
    {
      id: 'util-shadow',
      title: 'ホワイトASIN設定',
      type: 'item',
      url: '/TranslationOutlined',
      icon: TranslationOutlined
    }
    ,
    {
      id: 'util-shadow',
      title: 'ブラック購入者設定',
      type: 'item',
      url: '/shadow',
      icon: UsergroupDeleteOutlined
    },
    {
      id: 'util-shadow',
      title: '装飾画像設定',
      type: 'item',
      url: '/shadow',
      icon: FileGifOutlined
    } ,
    {
      id: 'util-shadow',
      title: 'アカウント設定',
      type: 'item',
      url: '/shadow',
      icon: UserOutlined
    }
  ]
};

export default utilities;
