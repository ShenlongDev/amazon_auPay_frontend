// assets
import { DashboardOutlined, HistoryOutlined, TrophyOutlined,HighlightOutlined, RadarChartOutlined, UsergroupAddOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined, HistoryOutlined, TrophyOutlined, HighlightOutlined, RadarChartOutlined, UsergroupAddOutlined, AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: '試合管理',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: '新規作成',
      type: 'item',
      url: 'default',
      icon: icons.AppstoreAddOutlined,
      breadcrumbs: false
    },
    // {
    //   id: 'self',
    //   title: '自分の試合',
    //   type: 'item',
    //   url: 'self',
    //   icon: icons.DashboardOutlined,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'poker-detail',
    //   title: '試合詳細',
    //   type: 'item',
    //   url: 'poker-detail',
    //   icon: icons.TrophyOutlined,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'user-detail',
    //   title: 'Player管理',
    //   type: 'item',
    //   url: 'poker-detail',
    //   icon: icons.UsergroupAddOutlined,
    //   breadcrumbs: false
    // },
    {
      id: 'dashboard2',
      title: '試合詳細AI',
      type: 'item',
      url: '/poker-detail-ai',
      icon: icons.TrophyOutlined,
      breadcrumbs: false
    },
    {
      id: 'dashboard3',
      title: '履歴分析',
      type: 'item',
      url: '/poker-history',
      icon: icons.HistoryOutlined,
      breadcrumbs: false
    },
    {
      id: 'dashboard4',
      title: '詳細分析',
      type: 'item',
      url: '/poker-ai-chart',
      icon: icons.RadarChartOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
