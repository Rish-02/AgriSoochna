import { useEffect, useState } from 'react';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { IoIosNotifications } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaClock, FaCalendarAlt, FaFileAlt, FaUsers } from "react-icons/fa";

import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [latestVideo, setLatestVideo] = useState(null);
  const [modalVideoUrl, setModalVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);



  // Fetch Latest Video
  const fetchLatestVideo = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:5000/api/latest-video"); // Fetch latest video
      if (response.data) {
        setLatestVideo(response.data);
      }
    } catch (error) {
      toast.warn("Showing static latest video");
      console.error("Latest Video Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Recommended Videos
  const fetchRecommendedVideos = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:5000/api/recommended-videos"); // Fetch recommended videos
      if (response.data && response.data.length > 0) {
        setRecommendedVideos(response.data);
      }
    } catch (error) {
      toast.warn("Showing static recommended videos");
      console.error("Recommended Videos Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLatestVideo(); // Fetch the latest video
    fetchRecommendedVideos(); // Fetch recommended videos
  }, []);


  useEffect(() => {
    const modal = document.getElementById('videoModal');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        const video = document.getElementById('modalVideo');
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, []);

  return (
    <>
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
            {/* Audience Retention Chart */}
            <div className="chart-section">
              <h3>Audience Retention</h3>
              <div className="chart-placeholder">
                <img src="/Images/bar_graph.png" alt="" />
              </div>
            </div>

            {/* Latest Soochna (Static) */}
            <div className="latest-section">
              <h3>Latest Soochna</h3>
              <div className="latest-card">
                {loading ? (
                  <p>Loading...</p>
                ) : latestVideo ? (
                  <>
                    <img src={latestVideo.thumbnail} alt="Latest Video" />
                    <FaPlay
                      className="play-icon latest-play"
                      data-bs-toggle="modal"
                      data-bs-target="#videoModal"
                      onClick={() => setModalVideoUrl(latestVideo.videoUrl)}
                    />
                    <p className="image-caption">{latestVideo.title}</p>
                  </>
                ) : (
                  <>
                    <img src="/Images/static_img5.jpg" alt="Latest Video" />
                    <FaPlay
                      className="play-icon latest-play"
                      data-bs-toggle="modal"
                      data-bs-target="#videoModal"
                      onClick={() => setModalVideoUrl("/Videos/sample.mp4")}
                    />
                    <p className="image-caption">Latest Update</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Section (Dynamic or Static) */}
          <div className="recommended-section">
            <h3>Recommended Soochna</h3>
            <div className="recommended-container">
              {loading ? (
                <p>Loading...</p>
              ) : recommendedVideos.length > 0 ? (
                recommendedVideos.map((video, index) => (
                  <div key={index} className="video-placeholder">
                    <img src={video.thumbnail} alt={video.title} />
                    <FaPlay
                      className="play-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoModal"
                      onClick={() => setModalVideoUrl(video.videoUrl)}
                    />
                    <p className="image-caption">{video.title}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="video-placeholder">
                    <img src="/Images/static_img1.jpg" alt="Video 1" />
                    <FaPlay
                      className="play-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoModal"
                      onClick={() => setModalVideoUrl("/Videos/sample.mp4")}
                    />
                    <p className="image-caption">Video 1</p>
                  </div>
                  <div className="video-placeholder">
                    <img src="/Images/static_img2.jpg" alt="Video 2" />
                    <FaPlay
                      className="play-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoModal"
                      onClick={() => setModalVideoUrl("/Videos/sample.mp4")}
                    />
                    <p className="image-caption">Video 2</p>
                  </div>
                  <div className="video-placeholder">
                    <img src="/Images/static_img3.jpg" alt="Video 3" />
                    <FaPlay
                      className="play-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoModal"
                      onClick={() => setModalVideoUrl("/Videos/sample.mp4")}
                    />
                    <p className="image-caption">Video 3</p>
                  </div>
                  <div className="video-placeholder">
                    <img src="/Images/static_img4.jpg" alt="Video 4" />
                    <FaPlay
                      className="play-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoModal"
                      onClick={() => setModalVideoUrl("/Videos/sample.mp4")}
                    />
                    <p className="image-caption">Video 4</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="videoModal" tabIndex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content bg-dark">
            <div className="modal-body p-0">
              <video
                id="modalVideo"
                width="100%"
                controls
                style={{ maxHeight: '80vh', objectFit: 'cover' }}
              >
                <source
                  src={modalVideoUrl && modalVideoUrl !== "" ? modalVideoUrl : "/Videos/sample.mp4"}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
