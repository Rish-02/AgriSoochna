
import "./Dashboard.css";

const Dashboard = () => {
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
          <div className="card">Video 1</div>
          <div className="card">Video 2</div>
          <div className="card">Video 3</div>
        </section>


        <section className="content-section">
          <div className="continue-watching">
            <h3>Continue Watching</h3>
            <div className="video-placeholder">Video 1</div>
            <div className="video-placeholder"> Video2 </div>
            <div className="video-placeholder"> Video 3</div>
          </div>

          <div className="latest-video">
            <h3>Latest Video</h3>
            <div className="video-large"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
