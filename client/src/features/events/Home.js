import React from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../shared/components/Layout";
import ColumnLeft from "../../shared/components/ColumnLeft";
import ColumnRight from "../../shared/components/ColumnRight";
import Card from "./Card";
import AddEvent from "./AddEvent";
import { useEvents } from "./useEvents";

const VIEW_GROUPS = {
  active: ["not_started", "in_progress"],
  completed: ["completed"],
  wont_do: ["wont_do"],
};

const TABS = [
  { key: "active", label: "我的饼" },
  { key: "completed", label: "画完的饼" },
  { key: "wont_do", label: "垃圾桶" },
];

const EMPTY_MESSAGES = {
  active: "还没有饼，点下面画一个！",
  completed: "还没有画完的饼~",
  wont_do: "垃圾桶是空的，真棒！",
};

const Home = () => {
  const { data: eventData = [], isLoading } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") ?? "active";

  const filtered = eventData.filter((e) =>
    VIEW_GROUPS[view]?.includes(e.status ?? "not_started")
  );

  const switchTab = (key) => {
    if (key === "active") {
      setSearchParams({});
    } else {
      setSearchParams({ view: key });
    }
  };

  return (
    <div className="App">
      <Layout>
        <ColumnLeft />
        <div className="block">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => switchTab(key)}
                style={{
                  padding: "0.45rem 1.4rem",
                  borderRadius: "20px",
                  border: "none",
                  backgroundColor: view === key ? "#FFD6CC" : "#f5f0ee",
                  color: view === key ? "#7a3f30" : "#888",
                  fontWeight: view === key ? "bold" : "normal",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontSize: "0.9rem",
                  boxShadow: view === key ? "0 2px 8px rgba(255,140,100,0.2)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#bbb" }}>加载中...</div>
          ) : (
            <>
              {view === "active" && (
                <div className="block" style={{ textAlign: "center" }}>
                  <AddEvent />
                </div>
              )}
              {filtered.map((data, index) => (
                <Card data={data} key={data._id} index={index} />
              ))}
              {filtered.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#c4a99a",
                    padding: "2.5rem 1rem",
                    fontSize: "1rem",
                  }}
                >
                  {EMPTY_MESSAGES[view]}
                </div>
              )}
            </>
          )}
        </div>
        <ColumnRight />
      </Layout>
    </div>
  );
};

export default Home;
