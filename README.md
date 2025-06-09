# Mission Control Dashboard

A comprehensive Mission Control Dashboard built with React.js frontend and Express.js backend, featuring real-time mission management, authentication, and monitoring capabilities.

## 🚀 Features

### Core Features
- **Admin Authentication**: Secure JWT-based login system
- **Mission Management**: Create, read, update, and delete missions
- **Real-time Dashboard**: Live mission statistics and status updates
- **Mission Details**: Comprehensive view with timeline and location data
- **Status Management**: Toggle between active and completed missions

### Optional Features
- **Live Timer**: Real-time elapsed time display for active missions
- **Error Logging**: Simulated mission event logs with different severity levels
- **Map Integration**: Placeholder for location-based mapping (ready for Leaflet/Google Maps)
- **Responsive Design**: Mobile-friendly interface

## 🛠 Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd mission-control-dashboard
   \`\`\`

2. **Install dependencies for all packages**
   \`\`\`bash
   npm run install-all
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/mission-control
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   \`\`\`

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Ensure your connection string is correct

5. **Run the application**
   \`\`\`bash
   # Start both frontend and backend concurrently
   npm run dev
   
   # Or start them separately:
   # Backend (from backend directory)
   cd backend && npm run dev
   
   # Frontend (from frontend directory)
   cd frontend && npm start
   \`\`\`

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔐 Authentication

### Demo Credentials
- **Username**: admin
- **Password**: password

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

#### Missions
- `GET /api/missions` - Get all missions
- `POST /api/missions` - Create new mission
- `GET /api/missions/:id` - Get mission by ID
- `PUT /api/missions/:id` - Update mission
- `DELETE /api/missions/:id` - Delete mission
- `GET /api/missions/stats/overview` - Get mission statistics

## 📱 Pages & Components

### Pages
- **Login Page** (`/login`) - Authentication interface
- **Dashboard** (`/dashboard`) - Mission overview and management
- **Create Mission** (`/create-mission`) - Form for creating new missions
- **Mission Details** (`/mission/:id`) - Detailed mission view

### Components
- **Navbar** - Navigation and user controls
- **Timer** - Real-time elapsed time display
- **MapView** - Location display (placeholder for map integration)
- **ErrorLog** - Mission event logging
- **ProtectedRoute** - Route protection wrapper

## 🗄 Database Schema

### Mission Model
\`\`\`javascript
{
  title: String (required),
  description: String (required),
  status: String (enum: ['active', 'completed']),
  startTime: Date (required),
  endTime: Date (optional),
  location: String (optional),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### User Model
\`\`\`javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Backend server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

### Security Features
- JWT authentication with HTTP-only tokens
- Password hashing with bcryptjs
- CORS protection
- Rate limiting
- Input validation and sanitization
- Helmet.js security headers

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Update API base URL in production

## 🔮 Future Enhancements

- **Real Map Integration**: Implement Leaflet or Google Maps
- **WebSocket Support**: Real-time updates and notifications
- **Advanced Authentication**: Role-based access control
- **File Uploads**: Mission attachments and documents
- **Advanced Logging**: Comprehensive audit trails
- **Mobile App**: React Native companion app
- **Data Visualization**: Charts and analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

**Demo Credentials**: admin / password
