import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
const Order = Loadable(lazy(() => import('pages/dashboard/Order')));
const DeliveryMsgHistory = Loadable(lazy(() => import('pages/dashboard/DeliveryMsgHistory')));
const Profit = Loadable(lazy(() => import('pages/dashboard/Profit')));
const ItemList = Loadable(lazy(() => import('pages/dashboard/ItemList')));
const ItemEdit = Loadable(lazy(() => import('pages/dashboard/ItemEdit')));
const ItemToView = Loadable(lazy(() => import('pages/dashboard/ItemToView')));
const ItemAsinDel = Loadable(lazy(() => import('pages/dashboard/ItemAsinDel')));
const PriceEdit = Loadable(lazy(() => import('pages/dashboard/PriceEdit')));
const ExcludeWords = Loadable(lazy(() => import('pages/dashboard/ExcludeWords')));
const WhiteASINSet = Loadable(lazy(() => import('pages/dashboard/WhiteASINSet')));
const BlackBuyerSet = Loadable(lazy(() => import('pages/dashboard/BlackBuyerSet')));
const ImgSet = Loadable(lazy(() => import('pages/dashboard/ImgSet')));
const Account = Loadable(lazy(() => import('pages/dashboard/Account')));
const ResetPassword = Loadable(lazy(() => import('pages/dashboard/ResetPassword')));

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    // {
    //   path: '/',
    //   element: <Order />
    // },
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
      path: '/item_to_view',
      element: <ItemToView />
    },
    {
      path: '/item_asin_del',
      element: <ItemAsinDel />
    },
    {
      path: '/profit',
      element: <Profit />
    },
    {
      path: '/price_edit',
      element: <PriceEdit />
    },
    {
      path: '/exclude_words',
      element: <ExcludeWords />
    },
    {
      path: 'white_asin_set',
      element: <WhiteASINSet />
    },
    {
      path: '/black_buyer_set',
      element: <BlackBuyerSet />
    },
    {
      path: '/img_set',
      element: <ImgSet />
    },
    {
      path: '/account',
      element: <Account />
    },
    {
      path: '/reset_password',
      element: <ResetPassword />
    },

    {
      path: 'default',
      element: <DashboardDefault />
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
