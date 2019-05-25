import React from "react";
import PropTypes from "prop-types";
import { StyledLink } from "baseui/link";
import { Label2 } from "baseui/typography";
import { Block } from "baseui/block";

import Readme from "../atoms/Readme";
import { ProjectAvatar } from "../atoms/ProjectAvatar";
import { useFetchProjectReadMe } from "../../hooks/fetch-hooks";

const ProjectDetails = ({ project }) => {
  const { name, url, full_name, description } = project;
  console.log("Render", full_name);
  const { data: html, isLoading } = useFetchProjectReadMe(full_name);

  return (
    <Block>
      <Block display="flex">
        <Block paddingRight={"10px"}>
          <ProjectAvatar project={project} size={100} />
        </Block>
        <div>
          <Label2>{name}</Label2>
          <StyledLink href={`https://github.com/${full_name}`}>
            {full_name}
          </StyledLink>
          {url && (
            <p>
              <StyledLink href={url}>{url}</StyledLink>
            </p>
          )}
        </div>
      </Block>
      <hr />
      <p>{description}</p>
      <hr />
      <Readme html={html} isLoading={isLoading} />
    </Block>
  );
};

ProjectDetails.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectDetails;
