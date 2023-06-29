import React from "react";
import { useStreaks } from "./useStreaks";
import { getProfile } from "../../shared/config/profiles";

const PROFILES = ["Soapy", "Strawberry"];

const StreakPanel = () => {
  const { data: streaks, isLoading } = useStreaks();

  if (isLoading || !streaks) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1.5rem",
        marginBottom: "1rem",
      }}
    >
      {PROFILES.map((name) => (
        <div
          key={name}
          className="box"
          style={{ textAlign: "center", borderRadius: "20px", minWidth: "120px" }}
        >
          <figure className="image is-48x48" style={{ margin: "0 auto 0.5rem" }}>
            <img src={getProfile(name).image} alt={name} />
          </figure>
          <div style={{ fontWeight: "bold" }}>{name}</div>
          <div>🔥 {streaks[name]?.streak ?? 0} days</div>
        </div>
      ))}
    </div>
  );
};

export default StreakPanel;
