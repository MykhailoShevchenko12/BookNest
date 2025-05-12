import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import instagram_icon from "../../images/instagram.png";
import facebook_icon from "../../images/facebook.png";
import telegram_icon from "../../images/telegram.png";
import twitter_icon from "../../images/twitter.png";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-line"></div>
      <div className="footer-info">
        <div className="info-socialmedia">
          <span>BOOKNEST в соцмережах:</span>
          <div className="socialmedia">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagram_icon}
                alt="instagram"
                className="social-img"
              />
            </a>
            <a
              href="https://uk-ua.facebook.com/login/device-based/regular/login/?login_attempt=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook_icon}
                alt="facebook"
                className="social-img
            "
              />
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <img
                src={twitter_icon}
                alt="twitter"
                className="social-img
            "
              />
            </a>
            <a
              href="https://web.telegram.org/k/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={telegram_icon}
                alt="telegram"
                className="social-img
            "
              />
            </a>
          </div>
        </div>
        <div className="about">
          <ul className="about-items">
            <Link
              to={"/about"}
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              <li>Про BOOKNEST</li>
            </Link>
            <Link
              to={"/contact"}
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              <li>Контакти</li>
            </Link>
            <Link
              to={"/support"}
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              <li>Підтримка</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="footer-privacy">
        <p>© BookNest 2025. Усі права захищено</p>
      </div>
    </div>
  );
};
