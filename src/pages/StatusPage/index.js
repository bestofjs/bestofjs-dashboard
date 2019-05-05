import React from "react";
import Layout from "../../components/templates/Layout";
import StatusCard from "../../components/molecules/StatusCard";
import useFetchStatus from "../../hooks/useFetchEndpointStatus";

const Card = ({ url, title }) => {
  const result = useFetchStatus(url);
  return <StatusCard url={url} title={title} {...result} />;
};

const StatusPage = props => {
  return (
    <Layout>
      <h2>API Status</h2>
      <p>Use this page to check the status of all the APIs we connect.</p>
      <h3>Best of JavaScript APIs</h3>
      <div className="row">
        <Card
          url="https://bestofjs-api-v2.firebaseapp.com/projects.json"
          title="Project Full List"
        />
        <Card
          url="https://bestofjs-api-v2.firebaseapp.com/hof.json"
          title="Hall of Fame"
        />
        <Card
          url="https://bestofjs-api-v1.now.sh/projects/reduxjs/redux"
          title="Project Details"
        />
        <Card
          url="https://get-github-readme-v2.now.sh/reduxjs/redux?branch=master"
          title="Project README.md"
        />
      </div>
      <h3>External APIs</h3>
      <div className="row">
        <Card
          url="https://packagephobia.now.sh/api.json?p=got"
          title="Package Phobia"
        />
        <Card
          url="https://bundlephobia.com/api/size?package=riot"
          title="Bundle Phobia"
        />
        <Card url="https://api.npms.io/v2/package/got" title="NPMS" />
      </div>
    </Layout>
  );
};

export default StatusPage;
