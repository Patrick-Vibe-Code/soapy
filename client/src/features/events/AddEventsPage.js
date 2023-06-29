import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCreateEvent, useUpdateEvent } from "./useEvents";
import { STATUS_LIST, STATUS_COLORS } from "../../shared/config/status";
import "./addEventsPage.css";

const options = [
  { value: "举起猪脚画了个大饼说", label: "举起猪脚画了个大饼说" },
  { value: "觉得可能有可能", label: "觉得可能有可能" },
  { value: "说不是画饼一定可以", label: "说不是画饼一定可以" },
];

const AddEventsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editingData = state?.event ?? null;
  const { selectedProfile: currentUser } = useAuth();

  const [eventName, setEventName] = useState(editingData?.eventName ?? "");
  const [action, setAction] = useState(editingData?.action ?? options[0].value);
  const [memos, setMemos] = useState(editingData?.memos?.text ?? "");
  const [status, setStatus] = useState(editingData?.status ?? "not_started");

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();

  const buttonStyle = {
    backgroundColor: "#D8DDFE",
    borderRadius: "20px",
    width: "30%",
    margin: "0 auto",
  };

  const buildPayload = () => ({
    addedBy: editingData ? editingData.addedBy : currentUser,
    eventName,
    action,
    status,
    changedBy: currentUser,
    memos: { writtenBy: currentUser, text: memos },
  });

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingData) {
        await updateEvent.mutateAsync({ id: editingData._id, payload: buildPayload() });
      } else {
        await createEvent.mutateAsync(buildPayload());
      }
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="column is-3"></div>
      <div className="column">
        <div className="section py-1">
          <div className="box form-section" style={{ borderRadius: "20px" }}>
            <form className="form" onSubmit={handleSubmitEvent}>
              <label className="label">
                {currentUser + "..."}
                <CreatableSelect
                  defaultValue={
                    editingData ? { value: action, label: action } : null
                  }
                  formatCreateLabel={(inputValue) => `创建 ${inputValue}`}
                  placeholder="请选择或者自己写"
                  options={options}
                  styles={{
                    control: (base) => ({
                      ...base,
                      boxShadow: "none",
                      borderRadius: "20px",
                    }),
                  }}
                  onChange={(e) => e && setAction(e.value)}
                />
              </label>
              <label className="label">
                想什么呢？
                <input
                  className="input"
                  value={eventName}
                  style={{ boxShadow: "none", borderRadius: "20px" }}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="哪家的饼好吃呢"
                />
              </label>
              <label className="label">
                进度如何？
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  {STATUS_LIST.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setStatus(value)}
                      style={{
                        padding: "0.4rem 1rem",
                        borderRadius: "20px",
                        border: `2px solid ${STATUS_COLORS[value]}`,
                        backgroundColor: status === value ? STATUS_COLORS[value] : "white",
                        cursor: "pointer",
                        fontWeight: status === value ? "bold" : "normal",
                        transition: "all 0.2s",
                        fontSize: "0.875rem",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </label>
              <label className="label">
                有什么要注意的吗？
                <textarea
                  value={memos}
                  placeholder="可以没有"
                  className="textarea"
                  style={{ boxShadow: "none", borderRadius: "20px" }}
                  onChange={(e) => setMemos(e.target.value)}
                />
              </label>
              <button className="button" type="submit" style={buttonStyle}>
                交卷！
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="column is-3"></div>
    </>
  );
};

export default AddEventsPage;
