import React, { useContext } from "react";
import { H3, H4, Paragraph1, Paragraph2 } from "baseui/typography";
import { StyledLink } from "baseui/link";

import Layout from "../components/templates/Layout";
import ProjectTable from "../components/molecules/ProjectTable";
import { ProjectListContext, sortBy } from "../providers/project-list-provider";
import {
  getStarsAddedYesterday,
  getStarsAddedThisWeek,
  getStarsAddedThisMonth,
  getStarsAddedThisYear
} from "../providers/project-selectors";
import { PageTitle, SectionTitle } from "../components/atoms/typography";
import { Spinner } from "baseui/spinner";

const HomePage = props => {
  return (
    <Layout>
      <PageTitle>Best of JavaScript Dashboard</PageTitle>
      <Paragraph2>
        A dashboard to control all the things related to{" "}
        <StyledLink href="https://bestofjs.org">Best of JavaScript</StyledLink>.
      </Paragraph2>
      <HomePageSections />
    </Layout>
  );
};

const HomePageSections = () => {
  const { projects, isLoading /* tags */ } = useContext(ProjectListContext);
  if (isLoading) return <Spinner />;
  return (
    <>
      <SectionTitle>Last projects added</SectionTitle>
      <ProjectTable projects={projects.slice(projects.length - 10).reverse()} />

      <H3>Trending</H3>

      <H4>Last 7 days</H4>
      <ProjectTable
        projects={sortBy(getStarsAddedThisWeek, -1)(projects).slice(0, 5)}
      />

      <H4>Last 30 days</H4>
      <ProjectTable
        projects={sortBy(getStarsAddedThisMonth, -1)(projects).slice(0, 10)}
      />

      <H4>Last 12 months</H4>
      <ProjectTable
        projects={sortBy(getStarsAddedThisYear, -1)(projects).slice(0, 10)}
      />

      <H3>Cold</H3>

      <H4>Cold yesterday</H4>
      <ProjectTable
        projects={sortBy(getStarsAddedYesterday, 1)(projects).slice(0, 10)}
      />

      <H4>Cold this week</H4>
      <ProjectTable
        projects={sortBy(getStarsAddedThisWeek, 1)(projects).slice(0, 10)}
      />

      <H4>Cold this month</H4>
      <Paragraph1>
        {projects.filter(project => getStarsAddedThisMonth(project) < 0).length}{" "}
        projects lost stars over the last 30 days.
        <br />
        {
          projects.filter(project => getStarsAddedThisMonth(project) === 0)
            .length
        }{" "}
        projects have the same number of stars.
      </Paragraph1>
      <ProjectTable
        projects={sortBy(getStarsAddedThisMonth, 1)(projects).slice(0, 10)}
      />

      <H4>Cold this year</H4>
      <Paragraph1>
        {projects.filter(project => getStarsAddedThisYear(project) < 0).length}{" "}
        projects lost stars over the last 12 weeks.
        <br />
        {
          projects.filter(project => getStarsAddedThisYear(project) === 0)
            .length
        }{" "}
        projects have the same number of stars.
      </Paragraph1>
      <ProjectTable
        projects={sortBy(getStarsAddedThisYear, 1)(projects).slice(0, 20)}
      />
    </>
  );
};

export default HomePage;
