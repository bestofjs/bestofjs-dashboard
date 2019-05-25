import React from "react";
import { FixedSizeList as List } from "react-window";
import { styled } from "styletron-react";
import { Tag } from "baseui/tag";
import { StyledLink } from "baseui/link";

import StarIcon from "../atoms/StarIcon";
import StarDelta from "../atoms/StarDelta";
import { ProjectAvatar } from "../atoms/ProjectAvatar";
import fromNow from "../../utils/fromNow";
import {
  starsAddedThisWeek,
  starsAddedThisMonth,
  starsAddedThisYear
} from "../../providers/project-list-provider";

const TableRow = styled("div", {
  display: "flex",
  flex: "0 0 100%"
});

const Cell = styled("div", {
  padding: "1rem"
});

const Row = ({ index, style, data, onSelectTag, onSelectProject }) => {
  const project = data[index];
  const { name, stars, pushed_at, contributor_count, tags } = project;
  const handleClick = e => onSelectProject(project);

  return (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      <TableRow>
        <Cell style={{ width: 50, cursor: "pointer" }} onClick={handleClick}>
          <ProjectAvatar project={project} size={50} />
        </Cell>
        <Cell style={{ width: 150, cursor: "pointer" }} onClick={handleClick}>
          <StyledLink>{name}</StyledLink>
        </Cell>
        <Cell style={{ width: 120, textAlign: "right" }}>
          <StarIcon /> {stars}
          <br />
          <StarDelta delta={starsAddedThisWeek(project)} />
          <br />
          <StarDelta delta={starsAddedThisMonth(project)} />
          <br />
          <StarDelta delta={starsAddedThisYear(project)} />
        </Cell>
        <Cell>
          {fromNow(pushed_at)}
          <br />
          {contributor_count} contributors
        </Cell>
        <Cell>
          {tags.map(tag => (
            <Tag key={tag} closeable={false} onClick={() => onSelectTag(tag)}>
              {tag}
            </Tag>
          ))}
        </Cell>
      </TableRow>
    </div>
  );
};

const withProps = extraProps => Wrapped => props => (
  <Wrapped {...props} {...extraProps} />
);

const ProjectList = ({ projects, onSelectTag, onSelectProject }) => (
  <List
    itemData={projects}
    height={800}
    itemCount={projects.length}
    itemSize={120}
    width={"100%"}
    className="List"
  >
    {withProps({ onSelectTag, onSelectProject })(Row)}
  </List>
);

export default ProjectList;
