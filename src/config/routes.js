import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import AllDeals from '../pages/AllDeals';
import Categories from '../pages/Categories';
import AddDeal from '../pages/AddDeal';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
    component: Home,
    hideFromNav: true
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: Dashboard
  },
  allDeals: {
    id: 'allDeals',
    label: 'All Deals',
    path: '/deals',
    icon: 'Package',
    component: AllDeals
  },
  categories: {
    id: 'categories',
    label: 'Categories',
    path: '/categories',
    icon: 'FolderOpen',
    component: Categories
  },
  addDeal: {
    id: 'addDeal',
    label: 'Add Deal',
    path: '/add-deal',
    icon: 'Plus',
    component: AddDeal
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '*',
    component: NotFound,
    hideFromNav: true
  }
};

export const routeArray = Object.values(routes);
export const navRoutes = routeArray.filter(route => !route.hideFromNav);