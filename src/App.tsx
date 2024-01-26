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
        <Routes>
          <Route path="/login" element={
            <Layout hideNavbar={true}>
              <LoginPage />
            </Layout>} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout hideNavbar={undefined}>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <Layout hideNavbar={undefined}>
              <SettingsPage />
            </Layout>} />
          <Route path="/settings/user" element={
            <Layout hideNavbar={undefined}>
              <UserManagementPage />
            </Layout>} />
          <Route path="/settings/lists" element={
            <Layout hideNavbar={undefined}>
              <ListManagementPage />
            </Layout>} />
          <Route path="/settings/database" element={
            <Layout hideNavbar={undefined}>
              <DatabaseManagementPage />
            </Layout>} />
          <Route path="/settings/duel" element={
            <Layout hideNavbar={undefined}>
              <DuelManagementPage />
            </Layout>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;