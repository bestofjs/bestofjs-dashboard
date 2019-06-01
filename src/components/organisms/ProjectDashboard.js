import React, { useState } from "react";
import { Select, TYPE } from "baseui/select";
import { Label2 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Checkbox } from "baseui/checkbox";
import { Input, SIZE } from "baseui/input";
import { Block } from "baseui/block";
import { Delete as DeleteIcon } from "baseui/icon";
import { styled } from "baseui";

import ProjectList from "../molecules/ProjectList";
import ProjectDetails from "../molecules/ProjectDetails";
import { SortOrderPicker, sortOrderOptions } from "../atoms/search-options";
import { sortBy } from "../../providers/project-list-provider";
import search from "../../utils/search";

const Grid = styled("div", {
  display: "flex"
});

const Column = styled("div", props => ({
  width: "50%",
  paddingRight: props.first ? "1rem" : 0,
  paddingLeft: props.second ? "1rem" : 0
}));

const Section = styled("section", {
  backgroundColor: "white",
  padding: "1rem"
});

const ProjectDashboard = ({ projects, tags: allTags }) => {
  const [tags, setTags] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [hasIcon, setHasIcon] = useState(false);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(sortOrderOptions[0]);

  const options = allTags.map(({ name, code }) => ({ id: code, label: name }));
  const getTagById = id => {
    const found = options.find(tag => tag.id === id);
    return found;
  };

  const filteredProjects = findProjects(projects, { tags, hasIcon, query });
  const isFiltered = tags.length > 0 || hasIcon || query;

  const sortedProjects = sortBy(sortOrder.selector, sortOrder.direction)(
    filteredProjects
  );

  return (
    <Grid>
      <Column first>
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
              overrides={{
                After: () => (
                  <Block
                    display="flex"
                    alignItems="center"
                    paddingRight="scale500"
                  >
                    <DeleteIcon
                      size="16px"
                      onClick={() => setQuery("")}
                      style={{ cursor: "pointer" }}
                    />
                  </Block>
                )
              }}
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

          <Checkbox checked={hasIcon} onChange={() => setHasIcon(!hasIcon)}>
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
      <Column second>
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

function findProjects(projects, { tags, hasIcon, query }) {
  const tagIds = tags.map(tag => tag.id);

  const filterByTag = project =>
    tagIds.every(tagId => project.tags.includes(tagId));

  const filteredProjects = projects.filter(project => {
    if (tags.length > 0) {
      if (!filterByTag(project)) return false;
    }

    if (hasIcon) {
      if (!project.icon) return false;
    }

    return true;
  });

  const foundProjects = query
    ? search(filteredProjects, query)
    : filteredProjects;

  return foundProjects;
}

export default ProjectDashboard;
