import React from "react";
import Layout from "../../components/templates/Layout";

const HomePage = props => {
  return (
    <Layout>
      <h2>Welcome to Best of JavaScript Dashboard</h2>
      <p>
        A dashboard to control all the things related to{" "}
        <a href="https://bestofjs.org">Best of JavaScript</a>.
      </p>
    </Layout>
  );
};

export default HomePage;
