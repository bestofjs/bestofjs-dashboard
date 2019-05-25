import React, { useContext } from "react";

import Layout from "../components/templates/Layout";
import { ProjectListContext } from "../providers/project-list-provider";
import ProjectDashboard from "../components/organisms/ProjectDashboard";
import { PageTitle } from "../components/atoms/typography";

const ProjectsPage = props => {
  const { projects, tags } = useContext(ProjectListContext);
  return (
    <Layout>
      <PageTitle>Project Search</PageTitle>
      <ProjectDashboard projects={projects} tags={tags} />
    </Layout>
  );
};

export default ProjectsPage;
