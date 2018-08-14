import React from "react";
import Layout from "../../components/templates/Layout";

const StatusPage = props => {
  return (
    <Layout>
      <h2>API Status</h2>
      <p>Use this page to check the status of all the API we connect.</p>
      <div className="row">
        <div className="card">1</div>
        <div className="card">2</div>
      </div>
    </Layout>
  );
};

export default StatusPage;
