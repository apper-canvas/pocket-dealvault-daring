import HomePage from '@/components/pages/HomePage';
import DashboardPage from '@/components/pages/DashboardPage';
import AllDealsPage from '@/components/pages/AllDealsPage';
import CategoriesPage from '@/components/pages/CategoriesPage';
import AddDealPage from '@/components/pages/AddDealPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
component: HomePage,
    hideFromNav: true
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
component: DashboardPage
  },
  allDeals: {
    id: 'allDeals',
    label: 'All Deals',
    path: '/deals',
    icon: 'Package',
component: AllDealsPage
  },
  categories: {
    id: 'categories',
    label: 'Categories',
    path: '/categories',
    icon: 'FolderOpen',
component: CategoriesPage
  },
  addDeal: {
    id: 'addDeal',
    label: 'Add Deal',
    path: '/add-deal',
    icon: 'Plus',
component: AddDealPage
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '*',
component: NotFoundPage,
    hideFromNav: true
  }
};

export const routeArray = Object.values(routes);
export const navRoutes = routeArray.filter(route => !route.hideFromNav);