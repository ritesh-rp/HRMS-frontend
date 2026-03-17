import { useState, useEffect } from 'react';
import { api } from '../api';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import AttendanceForm from '../components/AttendanceForm';

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [attendanceData, employeesData] = await Promise.all([
        api.getAttendance(),
        api.getEmployees(),
      ]);
      setAttendance(attendanceData);
      setEmployees(employeesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      if (editingAttendance) {
        await api.updateAttendance(editingAttendance.id, formData);
      } else {
        await api.createAttendance(formData);
      }
      setShowModal(false);
      setEditingAttendance(null);
      loadData();
    } catch (err) {
      alert(`Error: ${err.message || err}`);
    }
  };

  const handleEdit = (record) => {
    setEditingAttendance(record);
    setShowModal(true);
  };

  const getEmployeeName = (empId) => {
    const emp = employees.find((e) => e.id === empId);
    return emp ? emp.full_name : 'Unknown';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAttendance(null);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Attendance</h1>
        <Button onClick={() => setShowModal(true)}>Mark Attendance</Button>
      </div>

      {attendance.length === 0 ? (
        <div className="empty-state">No attendance records found.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.id}>
                <td>{getEmployeeName(record.employee)}</td>
                <td>{record.date}</td>
                <td>
                  <span className={`status status-${record.status.toLowerCase()}`}>
                    {record.status}
                  </span>
                </td>
                <td>
                  <Button variant="secondary" onClick={() => handleEdit(record)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={showModal} onClose={handleCloseModal} title={editingAttendance ? 'Edit Attendance' : 'Mark Attendance'}>
        <AttendanceForm
          employees={employees}
          onSubmit={handleAdd}
          onCancel={handleCloseModal}
          initialData={editingAttendance}
        />
      </Modal>
    </div>
  );
}
