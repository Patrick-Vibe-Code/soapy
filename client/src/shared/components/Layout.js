import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <section className="section">
        <div className="container">
          <div className="columns">{children}</div>
        </div>
      </section>
    </>
  );
};

export default Layout;
