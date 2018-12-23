import App from './components/App.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'
import Messaging from './components/Messaging/Messaging.vue'
import Customize from './components/UIKits/Customize/Customize.vue'
import Components from './components/UIKits/Components/Components.vue'
import CardPage from './components/UIKits/CardPage.vue'
import FormPage from './components/UIKits/FormPage.vue'
import Table from './components/UIKits/Table/Table.vue'
import IconPage from './components/UIKits/IconPage/IconPage.vue'
import PriceTablePage from './components/UIKits/PriceTablePage.vue'
import ChartPage from './components/UIKits/ChartPage.vue'
import ExampleFormPage from './components/Example/ExampleFormPage.vue'
import ExampleProfilePage from './components/Example/ExampleProfilePage.vue'
import ExampleSearchPage from './components/Example/ExampleSearchPage.vue'
import ExampleLoginPage from './components/Login/LoginPage.vue'
import ExampleRegisterPage from './components/Example/ExampleRegisterPage.vue'
import Licences from './components/Licences/LicencesPage.vue'
import Admins from './components/Admin/AdminPage.vue'
import Stores from './components/Store/StoresPage.vue'
import Categories from './components/Categories/CategoriesPage.vue'
import Features from './components/Features/FeaturesPage.vue'
import About from './components/About/AboutPage.vue'
import ActivationPage from './components/ActivateUser/ActivateUser.vue'
import StoreTypePage from './components/StoreType/StoreTypePage.vue'
import Stacktraces from './components/StackTrace/StackTracesPage.vue'
import Statistics from './components/Statistics/StatisticsPage.vue'


import IndexPage from './components/Index/IndexPage.vue'
import ContactPage from './components/Contact/ContactPage.vue'
import OrderPage from './components/Order/OrderPage.vue'


import { isLoggedIn } from "./components/Utils/auth"
export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/app',
    component: App,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard'
      },
     
      {
        path: '/messaging',
        component: Messaging,
        name: 'Messaging'
      },
      {
        path: '/licences',
        component: Licences,
        name: 'Licences'
      },
      {
        path: '/admins',
        component: Admins,
        name: 'Admins'
      },
      {
        path: '/stores',
        component: Stores,
        name: 'Stores'
      },
      {
        path: '/categories',
        component: Categories,
        name: 'Categories'
      },
      {
        path: '/stacktrace',
        component: Stacktraces,
        name: 'Stacktraces'
      },
      {
        path: '/stats',
        component: Statistics,
        name: 'Statistics'
      },
      {
        path: '/storetype',
        component: StoreTypePage,
        name: 'StoreTypes'
      },
      {
        path: '/customize',
        component: Customize,
        name: 'Customize'
      },
      {
        path: '/components',
        component: Components,
        name: 'Components'
      },
      {
        path: '/card',
        component: CardPage,
        name: 'Card'
      },
      {
        path: '/form',
        component: FormPage,
        name: 'Form'
      },
      {
        path: '/table',
        component: Table,
        name: 'Table'
      },
      {
        path: '/icon',
        component: IconPage,
        name: 'Icon'
      },
      {
        path: '/price-table',
        component: PriceTablePage,
        name: 'Price Table'
      },
      {
        path: '/chart',
        component: ChartPage,
        name: 'Chart'
      },
      {
        path: '/example-form',
        component: ExampleFormPage
      },
      {
        path: '/example-profile',
        component: ExampleProfilePage
      },
      {
        path: '/example-search',
        component: ExampleSearchPage
      }
    ]
  },
  {
    path: '/login',
    component: ExampleLoginPage
  },
  {
    path: '/index',
    component: IndexPage,
    name: 'Index'
  },
  {
    path: '/contact',
    component: ContactPage,
    name: 'Contact'
  },
  {
    path: '/order',
    component: OrderPage,
    name: 'Order'
  },
  {
    path: '/register',
    component: ExampleRegisterPage
  },
  {
    path: '/features',
    component: Features
  },
  {
    path: '/about',
    component: About
  }
  ,
  {
    path: '/confirm',
    component: ActivationPage
  },
  

]
