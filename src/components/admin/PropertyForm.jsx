import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  price: '',
  location: '',
  property_type: 'flat',
  area_sqft: '',
  bedrooms: '',
  bathrooms: '',
  description: '',
  amenities: '',
  latitude: '',
  longitude: '',
  featured: false,
  only_few_left: false,
  images: [],
};

export function PropertyForm({ selectedProperty, onSubmit, onCancel, busy }) {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (selectedProperty) {
      setForm({
        ...selectedProperty,
        amenities: Array.isArray(selectedProperty.amenities) ? selectedProperty.amenities.join(', ') : '',
      });
    } else {
      setForm(initialState);
    }
  }, [selectedProperty]);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form className="card form-grid" onSubmit={(e) => { e.preventDefault(); onSubmit(form, files); }}>
      <h3>{selectedProperty ? 'Edit property' : 'Add property'}</h3>
      <input required placeholder="Title" value={form.title} onChange={(e) => update('title', e.target.value)} />
      <input required type="number" placeholder="Price" value={form.price} onChange={(e) => update('price', e.target.value)} />
      <input required placeholder="Location" value={form.location} onChange={(e) => update('location', e.target.value)} />
      <select value={form.property_type} onChange={(e) => update('property_type', e.target.value)}>
        <option value="flat">Flat</option>
        <option value="plot">Plot</option>
        <option value="commercial">Commercial</option>
      </select>
      <input required type="number" placeholder="Area (sq ft)" value={form.area_sqft} onChange={(e) => update('area_sqft', e.target.value)} />
      <input type="number" placeholder="Bedrooms" value={form.bedrooms || ''} onChange={(e) => update('bedrooms', e.target.value)} />
      <input type="number" placeholder="Bathrooms" value={form.bathrooms || ''} onChange={(e) => update('bathrooms', e.target.value)} />
      <input placeholder="Latitude" value={form.latitude || ''} onChange={(e) => update('latitude', e.target.value)} />
      <input placeholder="Longitude" value={form.longitude || ''} onChange={(e) => update('longitude', e.target.value)} />
      <textarea className="full-span" rows="4" placeholder="Description" value={form.description} onChange={(e) => update('description', e.target.value)} />
      <textarea className="full-span" rows="3" placeholder="Amenities (comma separated)" value={form.amenities} onChange={(e) => update('amenities', e.target.value)} />
      <label className="checkbox"><input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} /> Featured property</label>
      <label className="checkbox"><input type="checkbox" checked={form.only_few_left} onChange={(e) => update('only_few_left', e.target.checked)} /> Only few left badge</label>
      <input className="full-span" type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
      <div className="form-actions full-span">
        <button className="button button-primary" type="submit" disabled={busy}>{busy ? 'Saving...' : 'Save property'}</button>
        {selectedProperty ? <button className="button button-secondary" type="button" onClick={onCancel}>Cancel edit</button> : null}
      </div>
    </form>
  );
}
