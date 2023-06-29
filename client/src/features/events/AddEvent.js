import React from "react";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import { useNavigate } from "react-router-dom";
import "./addEvent.css";

const AddEvent = () => {
  const navigate = useNavigate();
  return (
    <div
      className="block"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <div
        className="box add-button"
        style={{
          minWidth: "5vw",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
          borderRadius: "20px",
        }}
        onClick={() => navigate("/form")}
      >
        <div className="pr-2" style={{ textAlign: "center" }}>
          点我画饼
        </div>
        <DrawOutlinedIcon fontSize="medium" sx={{ color: "black" }} />
      </div>
    </div>
  );
};

export default AddEvent;
