import { useState } from 'react';
import Button from './Button';

export default function AttendanceForm({ employees, onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      employee: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Employee *</label>
        <select
          required
          value={formData.employee}
          onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Date *</label>
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Status *</label>
        <select
          required
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <div className="form-actions">
        <Button type="submit">{initialData ? 'Update' : 'Mark'} Attendance</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
