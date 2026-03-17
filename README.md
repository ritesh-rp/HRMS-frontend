# HRMS Lite - Frontend

A modern, professional web-based HR Management System built with React and Vite.

## Features

- **Employee Management**: Add, view, and delete employee records
- **Attendance Tracking**: Mark and view daily attendance records
- **Professional UI**: Clean, responsive design with intuitive navigation
- **Real-time Updates**: Instant feedback on all operations
- **Error Handling**: Graceful error states and user feedback

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Pure CSS
- **API Communication**: Fetch API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (Django)

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HRMS-frontend/HRMS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your backend API URL:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── api.js              # API service layer
├── config.js           # Configuration
├── components/         # Reusable components
│   ├── Button.jsx
│   ├── Modal.jsx
│   ├── Loading.jsx
│   ├── ErrorMessage.jsx
│   ├── EmployeeForm.jsx
│   └── AttendanceForm.jsx
├── pages/              # Page components
│   ├── Employees.jsx
│   └── Attendance.jsx
├── App.jsx             # Main app component
├── App.css             # Styles
└── main.jsx            # Entry point
```

## API Endpoints Used

- `GET /api/employees/` - Fetch all employees
- `POST /api/employees/` - Create new employee
- `DELETE /api/employees/{id}/` - Delete employee
- `GET /api/attendance/` - Fetch all attendance records
- `POST /api/attendance/` - Mark attendance

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variable in Vercel dashboard:
   - `VITE_API_URL` = your backend API URL

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Set environment variable:
   - `VITE_API_URL` = your backend API URL

## Features Implemented

✅ Employee CRUD operations  
✅ Attendance marking and viewing  
✅ Form validation  
✅ Loading states  
✅ Error handling  
✅ Empty states  
✅ Responsive design  
✅ Professional UI/UX  
✅ Reusable components  

## Assumptions

- Single admin user (no authentication)
- Backend API is CORS-enabled
- Employee ID is unique and managed by admin
- Attendance can be marked for any date

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

