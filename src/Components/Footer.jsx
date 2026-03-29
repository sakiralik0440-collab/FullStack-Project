import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container">
        <div className="row footer-row">

          {/* Logo Section */}
          <div className="col-md-4 footer-logo">

            <NavLink className="logo-text" to="/">
              🧠 Quiz-Web
            </NavLink>

            <p className="footer-desc">
              Test your knowledge with interactive quizzes and improve
              your skills in a fun and engaging way.
            </p>

          </div>


          {/* Quick Links */}
          <div className="col-md-4 footer-links">

            <h4>Quick Links</h4>

            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/quiz">Quiz</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>

          </div>


          {/* Social Links */}
          <div className="col-md-4 footer-social">

            <h4>Follow Us</h4>

            <div className="social-icons">

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram"/>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn"/>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg" alt="Facebook"/>
              </a>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Github"/>
              </a>

            </div>

            <p className="designer">
              Designed by <strong>Sakirali Kodaliya</strong>
            </p>

          </div>

        </div>
      </div>


      {/* Bottom Footer */}
      <div className="footer-bottom">
        © 2026 Quiz-Web | All Rights Reserved
      </div>

    </footer>
  );
};

export default Footer;