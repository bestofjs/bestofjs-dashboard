import React from "react";
import { styled } from "baseui";
import { Block } from "baseui/block";
// import { H3 } from "baseui/typography";

import Layout from "../components/templates/Layout";
import StatusCard from "../components/molecules/StatusCard";
import { useFetchEndpointStatus } from "../hooks/fetch-hooks";
import { PageTitle, SectionTitle } from "../components/atoms/typography";

const Grid = styled("div", { display: "flex", margin: "-1rem 0 0 -1rem" });

const Card = props => {
  const { url, responseType } = props;
  const result = useFetchEndpointStatus(url, responseType);
  return (
    <Block padding={"1rem 0 0 1rem"}>
      <StatusCard {...result} {...props} />
    </Block>
  );
};

const StatusPage = props => {
  return (
    <Layout>
      <PageTitle>API Status</PageTitle>
      <p>Use this page to check the status of all the APIs we connect.</p>
      <SectionTitle>Best of JavaScript APIs</SectionTitle>
      <Grid>
        <Card
          url="https://bestofjs-api-v3.firebaseapp.com/projects.json"
          title="Project Full List"
          assertions={[({ projects }) => projects.length > 1000]}
          preview={({ projects }) =>
            projects
              .slice(0, 5)
              .map(project => project.name)
              .join(", ")
          }
        />
        <Card
          url="https://bestofjs-api-v3.firebaseapp.com/hof.json"
          title="Hall of Fame"
          assertions={[({ heroes }) => heroes.length > 100]}
          preview={({ heroes }) =>
            heroes
              .slice(0, 5)
              .map(hero => hero.username)
              .join(", ")
          }
        />
        <Card
          url="https://bestofjs-api-v3.now.sh/projects/reduxjs/redux"
          title="Project Details v3"
          assertions={[({ name }) => name === "Redux"]}
          preview={({ name, description }) => `${name} ${description}`}
        />
        <Card
          responseType="html"
          url="https://get-github-readme-v2.now.sh/reduxjs/redux?branch=master"
          title="Project README.md"
          assertions={[
            html => {
              return html.length > 1000;
            }
          ]}
          preview={html => html.slice(0, 50)}
        />
        <Card
          url="https://fetch-license.now.sh/package?name=redux"
          title="Project License"
          assertions={[
            ({ status, meta: { name } }) => status === "OK" && name === "redux"
          ]}
          preview={({ licenses }) =>
            Object.keys(licenses)
              .slice(0, 5)
              .join(", ")
          }
        />
      </Grid>
      <SectionTitle>External APIs</SectionTitle>
      <Grid>
        {false && (
          <Card
            url="https://packagephobia.now.sh/api.json?p=got"
            title="Package Phobia"
          />
        )}
        <Card
          url="https://bundlephobia.com/api/size?package=riot"
          title="Bundle Phobia"
        />
        <Card url="https://api.npms.io/v2/package/got" title="NPMS" />
      </Grid>
    </Layout>
  );
};

export default StatusPage;
