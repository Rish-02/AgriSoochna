import { NavLink } from 'react-router-dom';
import './Welcome.css';


const Welcome = () => {

    return (
        <div className="welcome-container">
            <header className="header">
                <img src="/Images/logo.png" alt="Logo" className="logo" />
                <div className="auth-buttons">
                    <NavLink to="/login" className="button signin-button">Sign in</NavLink>
                    <NavLink to="/signup" className="button signup-button">Sign up</NavLink>
                </div>
            </header>
            <main className="content">
                <div className="text-content">
                    <h3>Empower farmers today</h3>
                    <h1>AGRI सूचना</h1>
                    <p>
                        Turn complex government circulars into clear, engaging videos for farmers.
                        Our software simplifies updates on crop prices, schemes, and policies,
                        delivering vital information in easy-to-understand formats.
                    </p>
                    <NavLink to="/login" className="button get-started-button">Get Started</NavLink>
                    <div className="stats">
                        <div className="stat">
                            <strong>70% </strong>
                            <span> Farmers Benefited</span>
                        </div>
                        <div className="stat">
                            <strong>500+  </strong>
                            <span> Videos Generated</span>
                        </div>
                    </div>
                </div>
                <div className="image-content">
                    <img src="/Images/image.png" alt="Plant in hands" className="main-image" />
                </div>
            </main>
        </div>
    );
}

export default Welcome;