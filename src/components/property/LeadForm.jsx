import { useState } from 'react';
import { submitLead } from '../../lib/api';
import { buildWhatsAppUrl } from '../../lib/utils';

export function LeadForm({ propertyName = 'general enquiry', scheduleOnly = false }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  const defaultMessage = scheduleOnly
    ? `Hi, I want to schedule a visit for ${propertyName}. Please share available slots.`
    : `Hi, I am interested in ${propertyName}. Please share more details.`;

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('Sending...');
    const payload = {
      ...form,
      property_name: propertyName,
      message: form.message || defaultMessage,
    };
    const { error } = await submitLead(payload);
    setStatus(error ? error.message : 'Enquiry submitted successfully.');
    if (!error) setForm({ name: '', phone: '', message: '' });
  }

  return (
    <form className="card lead-form" onSubmit={handleSubmit}>
      <h3>{scheduleOnly ? 'Schedule a visit' : 'Get in touch'}</h3>
      <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input required placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <textarea
        rows="4"
        placeholder={defaultMessage}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button className="button button-primary" type="submit">{scheduleOnly ? 'Request visit' : 'Submit enquiry'}</button>
      <a className="button button-secondary" href={buildWhatsAppUrl(whatsappNumber, defaultMessage)} target="_blank" rel="noreferrer">
        Chat on WhatsApp
      </a>
      {status ? <p className="status-text">{status}</p> : null}
    </form>
  );
}
