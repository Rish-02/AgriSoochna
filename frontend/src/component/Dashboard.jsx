
import "./Dashboard.css";
import { useEffect, useState } from 'react';

const Dashboard = () => {

  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [latestVideo, setLatestVideo] = useState(null);

  useEffect(() => {
    // Fetch Recommended Videosa
    fetch('http://localhost:5000/api/recommended')
      .then(response => response.json())
      .then(data => setRecommendedVideos(data))
      .catch(error => console.error("Error fetching recommended videos:", error));

    // Fetch Continue Watching Videos
    fetch('http://localhost:5000/api/continue-watching')
      .then(response => response.json())
      .then(data => setContinueWatching(data))
      .catch(error => console.error("Error fetching continue watching videos:", error));

    // Fetch Latest Video
    fetch('http://localhost:5000/api/latest')
      .then(response => response.json())
      .then(data => setLatestVideo(data))
      .catch(error => console.error("Error fetching latest video:", error));
  }, []);




  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <div className="logo">
          <img src="/Images/logo.png" alt="Logo" />
        </div>
      </aside>


      <main className="main-content">

        <header className="dashboard-header">
          <h2>Recommended Soochna</h2>
          <div className="search-bar">
            <input type="text" placeholder="🔍 Search" />
          </div>
        </header>


        <section className="recommended">
          {recommendedVideos.length > 0 ? (
            recommendedVideos.map((video, index) => (
              <div key={index} className="recommended-item">{video.title}</div>
            ))
          ) : (
            <>
              <div className="card">Video 1</div>
              <div className="card">Video 2</div>
              <div className="card">Video 3</div>
            </>
          )}

        </section>


        <section className="content-section">
          <div className="continue-watching">
            <h3>Continue Watching</h3>
            {continueWatching.length > 0 ? (
              continueWatching.map((video, index) => (
                <div key={index} className="video-placeholder">{video.title}</div>
              ))
            ) : (
              <>
                <div className="video-placeholder">Video 1</div>
                <div className="video-placeholder"> Video2 </div>
                <div className="video-placeholder"> Video 3</div>
              </>
            )}
          </div>

          <div className="latest-video">
            <h3>Latest Video</h3>
            {latestVideo ? (
              <div className="vvideo-large">{latestVideo.title}</div>
            ) : (
              <div className="video-large"></div>

            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
