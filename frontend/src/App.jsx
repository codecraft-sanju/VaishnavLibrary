import { Suspense, lazy } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={isAuth ? <Layout /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={isAuth ? <Layout /> : <Login />} />
          <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
          <Route path="*" element={<div className="text-white text-2xl">404 Not Found <Link to="/" className='btn  bg-purple-500'>Go Home</Link></div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
