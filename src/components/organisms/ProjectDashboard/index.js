import React from "react";
import ProjectList from "../../molecules/ProjectList";

const ProjectDashboard = ({ projects }) => {
  return (
    <div>
      <ProjectList projects={projects} />
    </div>
  );
};

export default ProjectDashboard;
