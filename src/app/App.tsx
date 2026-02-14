import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '@pages/Login';
import RegisterPage from '@pages/Register';
import DashboardPage from '@pages/Dashboard';
import CreateExamPage from '@pages/CreateExam';
import TakeExamPage from '@pages/TakeExam';
import ResultPage from '@pages/Result';
import ReportsPage from '@pages/Reports';
import { AppLayout } from '@common/AppLayout';
import { ProtectedRoute } from '@common/ProtectedRoute';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="create-exam" element={<CreateExamPage />} />
        <Route path="take-exam/:id" element={<TakeExamPage />} />
        <Route path="result/:id" element={<ResultPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
