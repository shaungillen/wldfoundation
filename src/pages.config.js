import Home from './pages/Home';
import About from './pages/About';
import William from './pages/William';
import Collection from './pages/Collection';
import ArtworkDetail from './pages/ArtworkDetail';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import Gallery from './pages/Gallery';
import Tours from './pages/Tours';
import VirtualTour from './pages/VirtualTour';
import ArtLoanProgram from './pages/ArtLoanProgram';
import LoanCaseStudy from './pages/LoanCaseStudy';
import News from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import GetInvolved from './pages/GetInvolved';
import HarlemChildrensZone from './pages/HarlemChildrensZone';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "William": William,
    "Collection": Collection,
    "ArtworkDetail": ArtworkDetail,
    "Artists": Artists,
    "ArtistDetail": ArtistDetail,
    "Gallery": Gallery,
    "Tours": Tours,
    "VirtualTour": VirtualTour,
    "ArtLoanProgram": ArtLoanProgram,
    "LoanCaseStudy": LoanCaseStudy,
    "News": News,
    "ArticleDetail": ArticleDetail,
    "GetInvolved": GetInvolved,
    "HarlemChildrensZone": HarlemChildrensZone,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};