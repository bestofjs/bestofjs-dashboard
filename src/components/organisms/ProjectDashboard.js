import React, { useState } from "react";
import { Select, TYPE } from "baseui/select";
import { Label2 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Checkbox } from "baseui/checkbox";
import { Input, SIZE } from "baseui/input";
import { styled } from "baseui";

import ProjectList from "../molecules/ProjectList";
import ProjectDetails from "../molecules/ProjectDetails";
import { SortOrderPicker, sortOrderOptions } from "../atoms/search-options";
import { sortBy } from "../../providers/project-list-provider";

const Grid = styled("div", {
  display: "flex",
  margin: "-2rem 0 0 -2rem",
  width: "100%"
});
const Column = styled("div", { flex: 1, padding: "2rem 0 0 2rem" });

const Section = styled("section", {
  backgroundColor: "white",
  padding: "1rem"
});

const ProjectDashboard = ({ projects, tags: allTags }) => {
  const [tags, setTags] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(sortOrderOptions[0]);

  const options = allTags.map(({ name, code }) => ({ id: code, label: name }));
  const getTagById = id => {
    const found = options.find(tag => tag.id === id);
    return found;
  };

  const filteredProjects = filterProjects(projects, { tags, checked, query });
  const isFiltered = tags.length > 0 || checked || query;

  const sortedProjects = sortBy(sortOrder.selector, sortOrder.direction)(
    filteredProjects
  );

  return (
    <Grid>
      <Column>
        <Section
          style={{
            marginBottom: "2rem"
          }}
        >
          <FormControl label="Keyword">
            <Input
              size={SIZE.compact}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter a keyword"
            />
          </FormControl>
          <FormControl label="Tags">
            <Select
              multi
              maxDropdownHeight="300px"
              type={TYPE.search}
              options={options}
              labelKey="label"
              valueKey="id"
              placeholder="Pick tags"
              value={tags}
              onChange={({ value }) => setTags(value)}
            />
          </FormControl>

          <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
            Show Only Featured projects
          </Checkbox>
        </Section>

        <Section>
          <Label2 style={{ marginBottom: "0.5rem" }}>
            {isFiltered
              ? `${filteredProjects.length} projects found`
              : `All projects (${projects.length})`}
          </Label2>
          <SortOrderPicker onChange={setSortOrder} value={sortOrder} />
          <ProjectList
            projects={sortedProjects}
            onSelectProject={project => setSelectedProject(project)}
            onSelectTag={id => setTags([getTagById(id)])}
          />
        </Section>
      </Column>
      <Column>
        <Section>
          {selectedProject ? (
            <ProjectDetails project={selectedProject} />
          ) : (
            <EmptySpace />
          )}
        </Section>
      </Column>
    </Grid>
  );
};

const EmptySpace = () => (
  <div
    style={{
      minHeight: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      color: "#ccc"
    }}
  >
    Select a project
  </div>
);

function filterProjects(projects, { tags, checked, query }) {
  const tagIds = tags.map(tag => tag.id);
  // const filterByTag = project => project.tags.some(tag => tagIds.includes(tag));
  const filterByTag = project =>
    tagIds.every(tagId => project.tags.includes(tagId));

  const filterByQuery = project => {
    const re1 = new RegExp("^" + query, "i");
    const re2 = new RegExp(query, "i");
    if (re1.test(project.name)) return true;
    if (re2.test(project.description)) {
      return true;
    }
  };

  return projects.filter(project => {
    if (tags.length > 0) {
      if (!filterByTag(project)) return false;
    }
    if (checked) {
      if (!project.icon) return false;
    }
    if (query) {
      if (!filterByQuery(project)) return false;
    }
    return true;
  });
}

export default ProjectDashboard;
