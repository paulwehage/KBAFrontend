import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {UserProvider} from './context/UserContext';
import LoginPage from './pages/login/LoginPage.tsx';
import HomePage from './pages/home/HomePage.tsx';
import {useUserContext} from './hooks/context/useUserContext.ts';
import SettingsPage from './pages/settings/SettingsPage.tsx';
import UserManagementPage from './pages/settings/user/UserManagementPage.tsx';
import ListManagementPage from './pages/settings/lists/ListManagementPage.tsx';
import DatabaseManagementPage from './pages/settings/database/DatabaseManagementPage.tsx';
import DuelManagementPage from './pages/settings/duel/DuelManagementPage.tsx';
import Layout from './components/Layout.tsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};


function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/user" element={<UserManagementPage />} />
          <Route path="/settings/lists" element={<ListManagementPage />} />
          <Route path="/settings/database" element={<DatabaseManagementPage />} />
          <Route path="/settings/duel" element={<DuelManagementPage />} />
        </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;