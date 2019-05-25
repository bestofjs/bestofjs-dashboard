import * as React from "react";
import { StyledTable, StyledBody, StyledRow, StyledCell } from "baseui/table";

import StarCount from "../atoms/StarCount";
import StarDelta from "../atoms/StarDelta";
import { ProjectAvatar } from "../atoms/ProjectAvatar";
import fromNow from "../../utils/fromNow";
import {
  starsAddedYesterday,
  starsAddedThisWeek,
  starsAddedThisMonth,
  starsAddedThisYear
} from "../../providers/project-list-provider";

const ProjectTable = ({ projects }) => {
  return (
    <StyledTable>
      <StyledBody>
        {projects.map(project => {
          const {
            name,
            stars,
            pushed_at,
            contributor_count,
            description
          } = project;
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
                <StarDelta delta={starsAddedYesterday(project)} />
              </StyledCell>
              <StyledCell>
                <StarDelta delta={starsAddedThisWeek(project)} />
              </StyledCell>
              <StyledCell>
                <StarDelta delta={starsAddedThisMonth(project)} />
              </StyledCell>
              <StyledCell>
                <StarDelta delta={starsAddedThisYear(project)} />
              </StyledCell>
              <StyledCell>{fromNow(pushed_at)}</StyledCell>
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
