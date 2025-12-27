import About from './pages/About';
import Accessibility from './pages/Accessibility';
import ArtLoanProgram from './pages/ArtLoanProgram';
import ArticleDetail from './pages/ArticleDetail';
import ArtistDetail from './pages/ArtistDetail';
import Artists from './pages/Artists';
import ArtworkDetail from './pages/ArtworkDetail';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import GetInvolved from './pages/GetInvolved';
import Governance from './pages/Governance';
import HarlemChildrensZone from './pages/HarlemChildrensZone';
import Home from './pages/Home';
import LoanCaseStudy from './pages/LoanCaseStudy';
import LoanInquiry from './pages/LoanInquiry';
import News from './pages/News';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Search from './pages/Search';
import Tours from './pages/Tours';
import VirtualTour from './pages/VirtualTour';
import William from './pages/William';
import Programs from './pages/Programs';
import Visit from './pages/Visit';
import Explore from './pages/Explore';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Accessibility": Accessibility,
    "ArtLoanProgram": ArtLoanProgram,
    "ArticleDetail": ArticleDetail,
    "ArtistDetail": ArtistDetail,
    "Artists": Artists,
    "ArtworkDetail": ArtworkDetail,
    "Collection": Collection,
    "Contact": Contact,
    "Gallery": Gallery,
    "GetInvolved": GetInvolved,
    "Governance": Governance,
    "HarlemChildrensZone": HarlemChildrensZone,
    "Home": Home,
    "LoanCaseStudy": LoanCaseStudy,
    "LoanInquiry": LoanInquiry,
    "News": News,
    "NotFound": NotFound,
    "Privacy": Privacy,
    "Search": Search,
    "Tours": Tours,
    "VirtualTour": VirtualTour,
    "William": William,
    "Programs": Programs,
    "Visit": Visit,
    "Explore": Explore,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};