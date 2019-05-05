import React, {useEffect, useState} from "react";
import Layout from "../../components/templates/Layout";

import ProjectDashboard from '../../components/organisms/ProjectDashboard'

const loadJson = (url) => fetch(url).then(res => res.json());

const sortByStars = projects => projects.sort((a, b) => a.stars > b.stars ? -1 : 1)

const ProjectsPage = props => {
  const [projects, setProjects] = useState([])
  useEffect(() => {
      const loadProjects = async () => {
        const url = 'https://bestofjs-api-v2.firebaseapp.com/projects.json'
        const result = await loadJson(url)
        setProjects(sortByStars(result.projects))
      }
    loadProjects()
  }, [])
  return (
    <Layout>
      <h2>All Projects ({projects.length})</h2>
      <ProjectDashboard projects={projects} />
    </Layout>
  );
};

export default ProjectsPage;
