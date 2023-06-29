import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import { useAuth } from "./AuthContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useAuth();
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (authenticated) {
      navigate("/profile-select");
    }
  }, [authenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/check-password", { password });
      if (response.data.status === "Correct") {
        setAuthenticated(true);
        localStorage.setItem("lastAuthenticated", Date.now());
        localStorage.setItem("authToken", response.data.token);
      } else {
        alert("Wrong Password");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <Header isHomePage={false} />
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <div className="section is-size-2" style={{ textAlign: "center" }}>
            Welcome
          </div>
          <div className="container mx-5">
            <form
              className="form"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please Enter The Password :)"
                required
                style={{ borderRadius: "20px" }}
              />
              <button
                className="button my-5"
                type="submit"
                style={{ borderRadius: "20px", width: "30%", margin: "0 auto" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="column is-3"></div>
      </div>
    </div>
  );
};

export default Login;
