import { useEffect, useState } from 'react';
import { BarChart3, LogOut, Trash2, Pencil, MessageCircleMore, PhoneCall } from 'lucide-react';
import { PropertyForm } from '../components/admin/PropertyForm';
import { deleteProperty, getDashboardAnalytics, getLeads, getProperties, saveProperty } from '../lib/api';
import { buildWhatsAppUrl, currency } from '../lib/utils';
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

  const toWhatsAppHref = (lead) => {
    const phone = String(lead.phone || '').replace(/\D/g, '');
    const text = `Hi ${lead.name || ''}, regarding your enquiry for ${lead.property_name || 'our property listing'}: ${lead.message || 'please let us know a good time to connect.'}`;
    return buildWhatsAppUrl(phone, text);
  };

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
            <div className="table-head-row">
              <h3>All properties</h3>
              <span className="table-pill">{properties.length} properties</span>
            </div>
            <table>
              <thead><tr><th>Title</th><th>Location</th><th>Type</th><th>Price</th><th>Actions</th></tr></thead>
              <tbody>
                {properties.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Title">{item.title}</td>
                    <td data-label="Location">{item.location}</td>
                    <td data-label="Type">{item.property_type}</td>
                    <td data-label="Price">₹ {currency(item.price)}</td>
                    <td data-label="Actions" className="table-actions">
                      <button onClick={() => setSelectedProperty(item)} aria-label="Edit property"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(item.id)} aria-label="Delete property"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card table-wrap">
          <div className="table-head-row">
            <h3>Lead management</h3>
            <span className="table-pill">{leads.length} leads</span>
          </div>
          <table>
            <thead><tr><th>Name</th><th>Phone</th><th>Property</th><th>Message</th><th>Contact</th></tr></thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td data-label="Name">{lead.name}</td>
                  <td data-label="Phone">{lead.phone}</td>
                  <td data-label="Property">{lead.property_name}</td>
                  <td data-label="Message">{lead.message}</td>
                  <td data-label="Contact">
                    <div className="lead-actions">
                      <a className="icon-link whatsapp-link" href={toWhatsAppHref(lead)} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
                        <MessageCircleMore size={18} />
                      </a>
                      <a className="icon-link call-link" href={`tel:${lead.phone || ''}`} aria-label="Call client">
                        <PhoneCall size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
