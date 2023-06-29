import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { useStreaks } from "../../features/events/useStreaks";
import { getProfile } from "../config/profiles";

const PROFILES = ["Soapy", "Strawberry"];

const Header = ({ isHomePage = true }) => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { data: streaks } = useStreaks({ enabled: isHomePage });
  const logoStyle = { maxHeight: "70px" };
  const [isClicked, setIsClicked] = useState(true);

  return (
    <nav className="navbar has-shadow is-white">
      <div className="navbar-brand pl-3">
        {isHomePage ? (
          <button
            className="navbar-item"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            <img
              src={process.env.PUBLIC_URL + "/pig.png"}
              alt="Soapy logo"
              style={logoStyle}
              className="py-2 px-2"
            />
            饼之家
          </button>
        ) : null}

        {isHomePage ? (
          <button
            className={isClicked ? "navbar-burger" : "navbar-burger is-active"}
            id="burger"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setIsClicked(!isClicked)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        ) : null}
      </div>
      {isHomePage ? (
        <div
          className={isClicked ? "navbar-menu" : "navbar-menu is-active"}
          id="nav-links"
        >
          <div className="navbar-end">
            <span className="navbar-item pr-5">V 1.0</span>
            {PROFILES.map((name) => (
              <span key={name} className="navbar-item pr-3">
                <figure className="image is-24x24 mr-1">
                  <img
                    src={getProfile(name).image}
                    alt={name}
                    style={{ borderRadius: "50%" }}
                  />
                </figure>
                🔥 {streaks?.[name]?.streak ?? 0}
              </span>
            ))}
            <button
              className="navbar-item pr-5"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={() => navigate({ pathname: "/home", search: "?view=completed" })}
            >
              画完的饼
            </button>
            <button
              className="navbar-item pr-5"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={handleLogout}
            >
              出门啦👋
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Header;
