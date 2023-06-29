import React from "react";
import "./card.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../shared/config/profiles";
import { STATUS_LABELS, STATUS_COLORS } from "../../shared/config/status";

const Card = ({ data, index }) => {
  const navigate = useNavigate();

  const status = data.status ?? "not_started";

  const handleEditClick = () => {
    navigate("/form", { state: { event: data } });
  };

  return (
    <div className="column">
      <div
        className="box card"
        id="box-content"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          "--i": index,
          borderRadius: "20px",
        }}
      >
        <div className="media" style={{ flex: 1 }}>
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={getProfile(data.addedBy).image} alt={data.addedBy} />
            </figure>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 12px",
                  borderRadius: "20px",
                  backgroundColor: STATUS_COLORS[status],
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {STATUS_LABELS[status]}
              </span>
            </div>
            <div className="content" style={{ display: "flex", flexDirection: "row" }}>
              <p>{`${data.addedBy}  ${data.action} ${data.eventName}`}</p>
            </div>
            {data.memos?.text ? (
              <div className="box py-2">
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <figure className="image is-32x32">
                    <img
                      src={getProfile(data.memos.writtenBy).image}
                      alt={data.memos.writtenBy}
                    />
                  </figure>
                  <div className="pl-2">
                    {getProfile(data.memos.writtenBy).displayName + "提醒说:"}
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>{data.memos.text}</div>
              </div>
            ) : null}
            {data.statusHistory?.length > 0 && (
              <div className="status-history">
                {data.statusHistory.map((entry, i) => (
                  <div key={i} className="status-bubble-row">
                    <figure className="image is-24x24 status-bubble-avatar">
                      <img
                        src={getProfile(entry.changedBy).image}
                        alt={entry.changedBy}
                        style={{ borderRadius: "50%" }}
                      />
                    </figure>
                    <div className="status-bubble">
                      {entry.changedBy} 说这个{STATUS_LABELS[entry.status] ?? entry.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="media-right"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <EditOutlinedIcon onClick={handleEditClick} className="edit-icon" />
        </div>
      </div>
    </div>
  );
};

export default Card;
