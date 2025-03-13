// assets
import { OrderedListOutlined, AlertOutlined, AccountBookOutlined, CalculatorOutlined, DashboardOutlined, HistoryOutlined, TrophyOutlined, HighlightOutlined, RadarChartOutlined, UsergroupAddOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: '財務管理',
  type: 'group',
  children: [
    {
      id: 'order',
      title: '注文処理',
      type: 'item',
      url: '/order',
      icon: OrderedListOutlined,
      breadcrumbs: false
    },
    // {
    //   id: 'dashboard2',
    //   title: '発送通知',
    //   type: 'item',
    //   url: '/poker-detail-ai',
    //   icon: AlertOutlined,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'dashboard3',
    //   title: '発送通知履歴',
    //   type: 'item',
    //   url: '/poker-history',
    //   icon: HistoryOutlined,
    //   breadcrumbs: false
    // },
    {
      id: 'result',
      title: '収益管理',
      type: 'item',
      url: '/result',
      icon: CalculatorOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
