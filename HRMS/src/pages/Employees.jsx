import { useState, useEffect } from 'react';
import { api } from '../api';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmployeeForm from '../components/EmployeeForm';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await api.getEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      if (editingEmployee) {
        await api.updateEmployee(editingEmployee.id, formData);
      } else {
        await api.createEmployee(formData);
      }
      setShowModal(false);
      setEditingEmployee(null);
      loadEmployees();
    } catch (err) {
      alert(`Error: ${err.message || err}`);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return;
    try {
      await api.deleteEmployee(id);
      loadEmployees();
    } catch (err) {
      alert(`Error: ${err.message || err}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Employees</h1>
        <Button onClick={() => setShowModal(true)}>Add Employee</Button>
      </div>

      {employees.length === 0 ? (
        <div className="empty-state">No employees found. Add your first employee.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <Button variant="secondary" onClick={() => handleEdit(emp)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(emp.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={showModal} onClose={handleCloseModal} title={editingEmployee ? 'Edit Employee' : 'Add Employee'}>
        <EmployeeForm 
          onSubmit={handleAdd} 
          onCancel={handleCloseModal}
          initialData={editingEmployee}
        />
      </Modal>
    </div>
  );
}
