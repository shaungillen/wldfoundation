import Home from './pages/Home';
import About from './pages/About';
import William from './pages/William';
import Collection from './pages/Collection';
import ArtworkDetail from './pages/ArtworkDetail';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "William": William,
    "Collection": Collection,
    "ArtworkDetail": ArtworkDetail,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};