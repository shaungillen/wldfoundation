import Home from './pages/Home';
import About from './pages/About';
import William from './pages/William';
import Collection from './pages/Collection';
import ArtworkDetail from './pages/ArtworkDetail';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import Gallery from './pages/Gallery';
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
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};