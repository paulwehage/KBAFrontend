import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {UserProvider} from './context/UserContext';
import LoginPage from './pages/login/LoginPage.tsx';
import HomePage from './pages/home/HomePage.tsx';
import {useUserContext} from './hooks/context/useUserContext.ts';

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
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;