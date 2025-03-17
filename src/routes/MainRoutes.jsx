import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

const PokerDetail = Loadable(lazy(() => import('pages/dashboard/PokerDetail')));
const PokerDetailAI = Loadable(lazy(() => import('pages/dashboard/PokerDetailAI')));
const PokerHistory = Loadable(lazy(() => import('pages/dashboard/PokerHistory')));
const PokerAIChart = Loadable(lazy(() => import('pages/dashboard/PokerAIChart')));
const IndexEdit = Loadable(lazy(() => import('pages/dashboard/IndexEdit')));
const Self = Loadable(lazy(() => import('pages/dashboard/Self')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
const Order = Loadable(lazy(() => import('pages/dashboard/Order')));
const DeliveryMsgHistory = Loadable(lazy(() => import('pages/dashboard/DeliveryMsgHistory')));
const Result = Loadable(lazy(() => import('pages/dashboard/Result')));
const ItemList = Loadable(lazy(() => import('pages/dashboard/ItemList')));
const ItemEdit = Loadable(lazy(() => import('pages/dashboard/ItemEdit')));

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <Order />
    },
    {
      path: '/order',
      element: <Order />
    },
    {
      path: '/delivery_msg_history',
      element: <DeliveryMsgHistory />
    },
    
    {
      path: '/item_list',
      element: <ItemList />
    },
    {
      path: '/item_edit',
      element: <ItemEdit />
    },
    {
      path: 'result',
      element: <Result />
    },
    {
      path: 'edit',
      element: <IndexEdit />
    }, 
    {
      path: 'self',
      element: <Self />
    },
    {
      path: 'default',
      element: <DashboardDefault />
    },    
    {
      path: 'poker-detail',
      element: <PokerDetail />
    },
    {
      path: 'poker-detail-ai',
      element: <PokerDetailAI />
    },
    {
      path: 'poker-history',
      element: <PokerHistory/>
    },
    {
      path: 'poker-ai-chart',
      element: <PokerAIChart/>
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
