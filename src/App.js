import Register from './pages/auth/Signup';
import Login from './pages/auth/Signin';
import ResetPassword from './pages/auth/ResetPassword';
import PageNotFound from './pages/error/PageNotFound';
import Verify from "./pages/auth/Verify";
import Reset from "./pages/auth/Reset";

// import Register from './components/signup';
// import Login from './components/signin';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}



function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="reset/:reset_token" element={<Reset />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="verify/:verify_token" element={<Verify />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
