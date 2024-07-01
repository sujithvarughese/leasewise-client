// PAGES
import Accounting from './pages/Accounting.jsx'
import { accountingLoader } from './pages/Accounting.jsx'
import DashboardManagement from './pages/DashboardManagement.jsx'
import { dashboardLoader } from './pages/DashboardManagement.jsx'
import DashboardTenant from './pages/DashboardTenant.jsx'
import Error from './pages/Error.jsx'
import Landing from './pages/Landing.jsx'
import Messages from './pages/Messages.jsx'
import { messagesLoader } from './pages/Messages.jsx'
import Research from './pages/Research.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Units from './pages/Units.jsx'
import { unitsLoader } from './pages/Units.jsx'
import Unit from "./pages/Unit.jsx"
import { unitLoader } from './pages/Unit.jsx'

// COMPONENTS

// accounting
import FinancesMobileTable from './components/accounting/financials-total/FinancesMobileTable.jsx'
import FinancesTotalCalculated from './components/accounting/financials-total/FinancesTotalCalculated.jsx'
import FinancesTotalUnitValues from './components/accounting/financials-total/FinancesTotalUnitValues.jsx'


// dashboard
import Charts from "./components/dashboard/Chart.jsx"
import Deposits from './components/dashboard/Deposits.jsx'
import Title from './components/dashboard/Title.jsx'
import UpcomingPayments from './components/dashboard/UpcomingPayments.jsx'

//landing
import Features from './components/landing/Features.jsx'
import Footer from './components/landing/Footer.jsx'
import Hero from './components/landing/Hero.jsx'
import Highlights from './components/landing/Highlights.jsx'
import Magazines from './components/landing/Magazines.jsx'
import Pricing from './components/landing/Pricing.jsx'
import Testimonials from './components/landing/Testimonials.jsx'

//messages
import MessageActions from './components/messages/MessageActions.jsx'
import MessageCollapsed from './components/messages/MessageCollapsed.jsx'
import MessageContents from './components/messages/MessageContents.jsx'
import MessageExpanded from './components/messages/MessageExpanded.jsx'
import ReplyMessageForm from './components/messages/ReplyMessageForm.jsx'

//nav
import DemoButton from './components/nav/DemoButton.jsx'
import { mainListItems, secondaryListItems } from './components/nav/listItems.jsx'
import PrivateLayout from './components/nav/PrivateLayout.jsx'
import PrivateNavbar from './components/nav/PrivateNavbar.jsx'
import PublicLayout from './components/nav/PublicLayout.jsx'
import PublicNavbar from './components/nav/PublicNavbar.jsx'
import { signInLoader } from './components/nav/PrivateLayout.jsx'

//units
import CreateUnitForm from './components/units/CreateUnitForm.jsx'
import EditUnitForm from './components/units/EditUnitForm.jsx'
import SearchUnits from './components/units/SearchUnits.jsx'
import UnitCoverGalleryMode from './components/units/UnitCoverGalleryMode.jsx'
import UnitMobile from './components/units/UnitMobile.jsx'
import UnitModal from './components/units/UnitModal.jsx'

export {
  Accounting,
  accountingLoader,
  DashboardManagement,
  dashboardLoader,
  DashboardTenant,
  Error,
  Landing,
  Messages,
  messagesLoader,
  Research,
  SignIn,
  SignUp,
  Units,
  unitsLoader,
  unitLoader,

  FinancesMobileTable,
  FinancesTotalCalculated,
  FinancesTotalUnitValues,

  Charts,
  Deposits,
  Title,
  UpcomingPayments,

  Features,
  Footer,
  Hero,
  Highlights,
  Magazines,
  Pricing,
  Testimonials,

  MessageActions,
  MessageCollapsed,
  MessageContents,
  MessageExpanded,
  ReplyMessageForm,

  DemoButton,
  mainListItems,
  secondaryListItems,
  PrivateLayout,
  PrivateNavbar,
  PublicLayout,
  PublicNavbar,
  signInLoader,

  CreateUnitForm,
  EditUnitForm,
  SearchUnits,
  Unit,
  UnitCoverGalleryMode,
  UnitMobile,
  UnitModal

}