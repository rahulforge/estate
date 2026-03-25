import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) return <div className="page-section container">Loading...</div>;
  if (!session) return <Navigate to="/admin/login" replace />;
  return children;
}
