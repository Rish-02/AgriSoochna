import { useEffect, useState } from 'react';
import './Dashboard.css';
import { IoIosNotifications } from "react-icons/io";
import { FaClock, FaCalendarAlt, FaFileAlt, FaUsers } from "react-icons/fa";

const Dashboard = () => {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <img src="/Images/logo2.png" alt="Logo" className="sidebar-logo" />
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <div className="header">
          <div>
            <h2 className='welcome'>Welcome!</h2>
            <p className='time'>{currentDateTime.toLocaleString()}</p>
          </div>
          <input type="text" placeholder="🔍 Search" className="search-bar" />
          {/* Icons Section */}
          <div className="header-icons">
            <IoIosNotifications className="notification" />
            <img src="/Images/user.png" alt="User" className="user-logo" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="card">
            <div className="card-title">Total Videos Watched <FaClock className="icon" /></div>
            <h2 className="card-value">25.1k</h2>
            <span className="change positive">+15%</span>
          </div>

          <div className="card">
            <div className="card-title">Farmers Empowered <FaCalendarAlt className="icon" /></div>
            <h2 className="card-value">3.5k</h2>
            <span className="change positive">+10%</span>
          </div>

          <div className="card">
            <div className="card-title">Circulars Processed <FaFileAlt className="icon" /></div>
            <h2 className="card-value">2.1k</h2>
            <span className="change negative">+10%</span>
          </div>

          <div className="card">
            <div className="card-title">Daily Active Users <FaUsers className="icon" /></div>
            <h2 className="card-value">2.67k</h2>
            <span className="change negative">+10%</span>
          </div>
        </div>

        <div className="middle">
          {/* Audience Retention Chart Placeholder */}
          <div className="chart-section">
            <h3>Audience Retention</h3>
            <div className="chart-placeholder">Graph</div>
          </div>

          {/* Latest Soochna */}
          <div className="latest-section">
            <h3>Latest Soochna</h3>
            <div className="latest-card">
              <div className="profile-img-placeholder"></div>
              <div>
                <h4>video 1</h4>
              </div>
            </div>
            {/* <div className="latest-card">
              <div className="profile-img-placeholder"></div>
              <div>
                <h4>video 2</h4>
              </div>
            </div> */}
          </div>
        </div>

        {/* Recommended Soochna (Empty Video Cards) */}
        <div className="recommended-section">
          <h3>Recommended Soochna</h3>
          <div className="recommended-container">
            <div className="video-placeholder">video 1 </div>
            <div className="video-placeholder"> video 2</div>
            <div className="video-placeholder">video 3</div>
            <div className="video-placeholder">video 4 </div>
            {/* <div className="video-placeholder">video 5 </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
