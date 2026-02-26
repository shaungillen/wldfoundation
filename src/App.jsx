import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

/**
 * Redirect /artworks/:id → /ArtworkDetail?id=:id
 * Keeps the canonical query-param resolver intact.
 */
const ArtworkDetailRouted = () => {
  const { artworkId } = useParams();
  return <Navigate to={`/ArtworkDetail?id=${artworkId}`} replace />;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}

      {/* /artworks/:id — redirects to /ArtworkDetail?id=:id */}
      <Route path="/artworks" element={<Navigate to="/Collection" replace />} />
      <Route path="/artworks/:artworkId" element={<ArtworkDetailRouted />} />

      {/* Lowercase alias routes for deep-linkable hub pages */}
      <Route path="/collection" element={<Navigate to="/Collection" replace />} />
      <Route path="/collection/:artworkId" element={
        <LayoutWrapper currentPageName="Collection">
          <Pages.Collection />
        </LayoutWrapper>
      } />
      <Route path="/artists" element={<Navigate to="/Artists" replace />} />
      <Route path="/artists/:artistId" element={
        <LayoutWrapper currentPageName="Artists">
          <Pages.Artists />
        </LayoutWrapper>
      } />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
