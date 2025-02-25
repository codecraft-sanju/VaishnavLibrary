import { Suspense, lazy } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loading from './components/Loading';
import { UserData } from './context/User';

const Welcome = lazy(() => import('./pages/Welcome'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Layout = lazy(() => import('./Layout'));
const Admin = lazy(() => import('./pages/Admin'));

const App = () => {
  const { isAuth, isLoading } = UserData();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          {/* Open Graph (WhatsApp, Facebook, LinkedIn) */}
          <meta
            property="og:description"
            content="Explore a vast collection of books with Vaishnav Library. Read online, download, and enjoy unlimited access!"
          />
          <meta
            property="og:image"
            content="https://library-heyu.onrender.com/logo.png"
          />
          <meta
            property="og:url"
            content="https://library-heyu.onrender.com/"
          />
          <meta property="og:type" content="website" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content="Explore a vast collection of books with Vaishnav Library. Read online, download, and enjoy unlimited access!"
          />
          <meta
            name="twitter:image"
            content="https://library-heyu.onrender.com/logo.png"
          />
        </Helmet>

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={isAuth ? <Layout /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={isAuth ? <Layout /> : <Login />} />
            <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
            <Route
              path="*"
              element={
                <div className="text-2xl text-white">
                  404 Not Found{' '}
                  <Link to="/" className="bg-purple-500 btn">
                    Go Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;
