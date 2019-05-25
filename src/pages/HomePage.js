import React, { useContext } from "react";
import { H3, H4, Paragraph1, Paragraph2 } from "baseui/typography";
import { StyledLink } from "baseui/link";

import Layout from "../components/templates/Layout";
import ProjectTable from "../components/molecules/ProjectTable";
import {
  ProjectListContext,
  sortBy,
  starsAddedYesterday,
  starsAddedThisWeek,
  starsAddedThisMonth,
  starsAddedThisYear
} from "../providers/project-list-provider";
import { PageTitle, SectionTitle } from "../components/atoms/typography";

const HomePage = props => {
  const { projects /* tags */ } = useContext(ProjectListContext);
  return (
    <Layout>
      <PageTitle>Best of JavaScript Dashboard</PageTitle>
      <Paragraph2>
        A dashboard to control all the things related to{" "}
        <StyledLink href="https://bestofjs.org">Best of JavaScript</StyledLink>.
      </Paragraph2>

      <SectionTitle>Last projects added</SectionTitle>
      <ProjectTable projects={projects.slice(projects.length - 10).reverse()} />

      <H3>Trending</H3>

      <H4>Last 7 days</H4>
      <ProjectTable
        projects={sortBy(starsAddedThisWeek, -1)(projects).slice(0, 5)}
      />

      <H4>Last 30 days</H4>
      <ProjectTable
        projects={sortBy(starsAddedThisMonth, -1)(projects).slice(0, 10)}
      />

      <H4>Last 12 months</H4>
      <ProjectTable
        projects={sortBy(starsAddedThisYear, -1)(projects).slice(0, 10)}
      />

      <H3>Cold</H3>

      <H4>Cold yesterday</H4>
      <ProjectTable
        projects={sortBy(starsAddedYesterday, 1)(projects).slice(0, 10)}
      />

      <H4>Cold this week</H4>
      <ProjectTable
        projects={sortBy(starsAddedThisWeek, 1)(projects).slice(0, 10)}
      />

      <H4>Cold this month</H4>
      <Paragraph1>
        {projects.filter(project => starsAddedThisMonth(project) < 0).length}{" "}
        projects lost stars over the last 30 days.
        <br />
        {
          projects.filter(project => starsAddedThisMonth(project) === 0).length
        }{" "}
        projects have the same number of stars.
      </Paragraph1>
      <ProjectTable
        projects={sortBy(starsAddedThisMonth, 1)(projects).slice(0, 10)}
      />

      <H4>Cold this year</H4>
      <Paragraph1>
        {projects.filter(project => starsAddedThisYear(project) < 0).length}{" "}
        projects lost stars over the last 12 weeks.
        <br />
        {
          projects.filter(project => starsAddedThisYear(project) === 0).length
        }{" "}
        projects have the same number of stars.
      </Paragraph1>
      <ProjectTable
        projects={sortBy(starsAddedThisYear, 1)(projects).slice(0, 20)}
      />
    </Layout>
  );
};

export default HomePage;
