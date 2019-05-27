import * as React from "react";
import { StyledTable, StyledBody, StyledRow, StyledCell } from "baseui/table";

import StarCount from "../atoms/StarCount";
import StarDelta from "../atoms/StarDelta";
import { ProjectAvatar } from "../atoms/ProjectAvatar";
import fromNow from "../../utils/fromNow";
import {
  getStarsAddedYesterday,
  getStarsAddedThisWeek,
  getStarsAddedThisMonth,
  getStarsAddedThisYear,
  getLastCommitDate
} from "../../providers/project-selectors";

const ProjectTable = ({ projects }) => {
  return (
    <StyledTable>
      <StyledBody>
        {projects.map(project => {
          const { name, stars, contributor_count, description } = project;
          return (
            <StyledRow key={name}>
              <StyledCell>
                <ProjectAvatar project={project} size={50} />
              </StyledCell>
              <StyledCell>{name}</StyledCell>
              <StyledCell>
                <StarCount value={stars} />
              </StyledCell>
              <StyledCell>
                <StarDelta delta={getStarsAddedYesterday(project)} />
              </StyledCell>
              <StyledCell>
                <StarDelta delta={getStarsAddedThisWeek(project)} />
              </StyledCell>
              <StyledCell>
                <StarDelta delta={getStarsAddedThisMonth(project)} />
              </StyledCell>
              <StyledCell>
                <StarDelta delta={getStarsAddedThisYear(project)} />
              </StyledCell>
              <StyledCell>{fromNow(getLastCommitDate(project))}</StyledCell>
              <StyledCell>{contributor_count}</StyledCell>
              <StyledCell>{description.slice(0, 50)}</StyledCell>
            </StyledRow>
          );
        })}
      </StyledBody>
    </StyledTable>
  );
};

export default ProjectTable;
