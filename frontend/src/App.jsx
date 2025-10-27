// /frontend/src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TicketListPage from './pages/TicketListPage.jsx';
import TicketFormPage from './pages/TicketFormPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <>
      <Navbar /> {/* Display the navigation bar globally */}
      <div className="container p-4 mx-auto">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tickets" element={<TicketListPage />} />
            <Route path="/tickets/new" element={<TicketFormPage />} />
            <Route path="/tickets/edit/:id" element={<TicketFormPage />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<div>404 | Page Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;