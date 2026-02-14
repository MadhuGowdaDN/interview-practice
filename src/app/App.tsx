import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '../components/AppShell';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import DashboardPage from '../pages/Dashboard';
import CreateExamPage from '../pages/CreateExam';
import TakeExamPage from '../pages/TakeExam';
import ResultPage from '../pages/Result';
import ReportsPage from '../pages/Reports';

const App = () => (
  <Routes>
    <Route element={<AppShell />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/create-exam" element={<ProtectedRoute><CreateExamPage /></ProtectedRoute>} />
      <Route path="/take-exam/:id" element={<ProtectedRoute><TakeExamPage /></ProtectedRoute>} />
      <Route path="/result/:id" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>
  </Routes>
);

export default App;
