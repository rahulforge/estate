import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hasSupabaseEnv } from '../lib/supabase';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signIn(form.email, form.password);
      navigate('/admin');
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="page-section">
      <Helmet><title>Admin Login | EstateFlow</title></Helmet>
      <div className="container narrow-container">
        <form className="card lead-form" onSubmit={handleSubmit}>
          <p className="eyebrow">Admin dashboard</p>
          <h1>Secure login</h1>
          {!hasSupabaseEnv ? <div className="notice">Contact Admin.</div> : null}
          <input type="email" required placeholder="Admin email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button className="button button-primary" type="submit">Login</button>
          {status ? <p className="status-text">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}
