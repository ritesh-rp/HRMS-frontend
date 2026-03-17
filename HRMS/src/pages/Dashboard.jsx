import { useState, useEffect } from 'react';
import { api } from '../api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Dashboard() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

  const getAttendanceByDate = () => {
    const dateMap = {};
    attendance.forEach((record) => {
      if (!dateMap[record.date]) {
        dateMap[record.date] = { present: 0, absent: 0 };
      }
      if (record.status === 'Present') {
        dateMap[record.date].present++;
      } else {
        dateMap[record.date].absent++;
      }
    });
    return dateMap;
  };

  const getDateStats = (date) => {
    const dateMap = getAttendanceByDate();
    return dateMap[date] || { present: 0, absent: 0 };
  };

  const getAllDates = () => {
    const dates = [...new Set(attendance.map((r) => r.date))].sort().reverse();
    return dates.slice(0, 7);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  const dates = getAllDates();
  const stats = getDateStats(selectedDate);
  const totalEmployees = employees.length;
  const maxValue = Math.max(...dates.map(d => {
    const s = getDateStats(d);
    return s.present + s.absent;
  }), 10);

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalEmployees}</div>
          <div className="stat-label">Total Employees</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.present}</div>
          <div className="stat-label">Present Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.absent}</div>
          <div className="stat-label">Absent Today</div>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <h2>Attendance Overview (Last 7 Days)</h2>
        </div>
        
        {dates.length === 0 ? (
          <div className="empty-state">No attendance data available</div>
        ) : (
          <div className="chart-container">
            <div className="chart">
              {dates.map((date) => {
                const dateStats = getDateStats(date);
                const total = dateStats.present + dateStats.absent;
                const presentHeight = total > 0 ? (dateStats.present / maxValue) * 100 : 0;
                const absentHeight = total > 0 ? (dateStats.absent / maxValue) * 100 : 0;

                return (
                  <div key={date} className="chart-bar-group">
                    <div className="chart-bars">
                      <div 
                        className="chart-bar chart-bar-present" 
                        style={{ height: `${presentHeight}%` }}
                        title={`Present: ${dateStats.present}`}
                      >
                        {dateStats.present > 0 && <span className="bar-label">{dateStats.present}</span>}
                      </div>
                      <div 
                        className="chart-bar chart-bar-absent" 
                        style={{ height: `${absentHeight}%` }}
                        title={`Absent: ${dateStats.absent}`}
                      >
                        {dateStats.absent > 0 && <span className="bar-label">{dateStats.absent}</span>}
                      </div>
                    </div>
                    <div className="chart-label">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                );
              })}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color legend-present"></span>
                <span>Present</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-absent"></span>
                <span>Absent</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <h2>Attendance by Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
        </div>
        <div className="date-stats">
          <div className="date-stat-item">
            <div className="date-stat-bar">
              <div 
                className="date-stat-fill date-stat-present" 
                style={{ width: `${totalEmployees > 0 ? (stats.present / totalEmployees) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="date-stat-info">
              <span className="date-stat-label">Present: {stats.present}</span>
              <span className="date-stat-percent">
                {totalEmployees > 0 ? Math.round((stats.present / totalEmployees) * 100) : 0}%
              </span>
            </div>
          </div>
          <div className="date-stat-item">
            <div className="date-stat-bar">
              <div 
                className="date-stat-fill date-stat-absent" 
                style={{ width: `${totalEmployees > 0 ? (stats.absent / totalEmployees) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="date-stat-info">
              <span className="date-stat-label">Absent: {stats.absent}</span>
              <span className="date-stat-percent">
                {totalEmployees > 0 ? Math.round((stats.absent / totalEmployees) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
