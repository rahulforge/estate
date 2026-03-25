import { useEffect, useState } from 'react';
import { BarChart3, LogOut, Trash2, Pencil } from 'lucide-react';
import { PropertyForm } from '../components/admin/PropertyForm';
import { deleteProperty, getDashboardAnalytics, getLeads, getProperties, saveProperty } from '../lib/api';
import { currency } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { signOut } = useAuth();
  const [analytics, setAnalytics] = useState({ totalProperties: 0, totalLeads: 0 });
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  async function loadData() {
    const [stats, propertyList, leadList] = await Promise.all([
      getDashboardAnalytics(),
      getProperties(),
      getLeads(),
    ]);
    setAnalytics(stats);
    setProperties(propertyList);
    setLeads(leadList);
  }

  useEffect(() => {
    loadData().catch((error) => setStatus(error.message));
  }, []);

  async function handleSave(form, files) {
    try {
      setBusy(true);
      await saveProperty(form, files);
      setSelectedProperty(null);
      setStatus('Property saved successfully.');
      await loadData();
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this property?')) return;
    try {
      await deleteProperty(id);
      await loadData();
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="page-section">
      <div className="container dashboard-head">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1>Manage properties and leads</h1>
        </div>
        <button className="button button-secondary" onClick={signOut}><LogOut size={18} /> Logout</button>
      </div>
      <div className="container dashboard-grid">
        <div className="stack-lg">
          <div className="analytics-grid">
            <div className="card analytics-card"><BarChart3 size={22} /><strong>{analytics.totalProperties}</strong><span>Total properties</span></div>
            <div className="card analytics-card"><BarChart3 size={22} /><strong>{analytics.totalLeads}</strong><span>Total leads</span></div>
          </div>
          <PropertyForm selectedProperty={selectedProperty} onSubmit={handleSave} onCancel={() => setSelectedProperty(null)} busy={busy} />
          {status ? <div className="notice">{status}</div> : null}
          <div className="card table-wrap">
            <h3>All properties</h3>
            <table>
              <thead><tr><th>Title</th><th>Location</th><th>Type</th><th>Price</th><th>Actions</th></tr></thead>
              <tbody>
                {properties.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.location}</td>
                    <td>{item.property_type}</td>
                    <td>₹ {currency(item.price)}</td>
                    <td className="table-actions">
                      <button onClick={() => setSelectedProperty(item)}><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card table-wrap">
          <h3>Lead management</h3>
          <table>
            <thead><tr><th>Name</th><th>Phone</th><th>Property</th><th>Message</th></tr></thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.property_name}</td>
                  <td>{lead.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
