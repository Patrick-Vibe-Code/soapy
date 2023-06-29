import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import { useAuth } from "./AuthContext";
import { useCheckin } from "../events/useStreaks";

const ProfileSelector = () => {
  const navigate = useNavigate();
  const { authenticated, selectedProfile, handleProfileSelect } = useAuth();
  const checkin = useCheckin();

  useEffect(() => {
    if (authenticated && !!selectedProfile) {
      navigate("/home");
    }
  }, [authenticated, selectedProfile, navigate]);

  return (
    <>
      <Header isHomePage={false} />
      <div className="container">
        <section
          className="section is-size-1 py-1"
          style={{ textAlign: "center" }}
        >
          欢迎回家
        </section>
        <section
          className="section is-size-3 pb-6 pt-1"
          style={{ textAlign: "center" }}
        >
          你是谁呢
        </section>
        <div className="columns">
          <div className="column is-3"></div>
          <div className="column is-3">
            <div
              className="box"
              style={{ cursor: "pointer", borderRadius: "20px" }}
              onClick={() => {
                checkin.mutate("Soapy");
                handleProfileSelect("Soapy");
              }}
            >
              <figure className="image is-256x256">
                <img src={`${process.env.PUBLIC_URL}/ppp.jpeg`} alt="Soapy" />
              </figure>
              <div style={{ textAlign: "center" }}>I'm Soapy</div>
            </div>
          </div>
          <div className="column is-3">
            <div
              className="box"
              style={{ cursor: "pointer", borderRadius: "20px" }}
              onClick={() => {
                checkin.mutate("Strawberry");
                handleProfileSelect("Strawberry");
              }}
            >
              <figure className="image is-256x256">
                <img
                  src={`${process.env.PUBLIC_URL}/ppa.jpeg`}
                  alt="Strawberry"
                />
              </figure>
              <div style={{ textAlign: "center" }}>I'm Strawberry</div>
            </div>
          </div>
          <div className="column is-3"></div>
        </div>
      </div>
    </>
  );
};

export default ProfileSelector;
