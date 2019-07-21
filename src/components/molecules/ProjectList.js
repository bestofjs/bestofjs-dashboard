import React from "react";
import { FixedSizeList as List } from "react-window";
import { styled } from "styletron-react";
import { Tag } from "baseui/tag";
import { StyledLink } from "baseui/link";

import StarIcon from "../atoms/StarIcon";
import StarDelta from "../atoms/StarDelta";
import RelativeGrowthRate from "../atoms/RelativeGrowthRate";
import { ProjectAvatar } from "../atoms/ProjectAvatar";
import fromNow from "../../utils/fromNow";
import {
  getStarsAddedThisWeek,
  getStarsAddedThisMonth,
  getStarsAddedThisYear,
  getStarsAddedYesterday,
  getRelativeGrowthRate
} from "../../providers/project-selectors";

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
          <br />
          <StarIcon /> {stars}
          <br />
          {fromNow(pushed_at)}
          <br />
          {contributor_count} contributors
        </Cell>
        <Cell style={{ width: 200 }}>
          1d: <StarDelta delta={getStarsAddedYesterday(project)} />{" "}
          <RelativeGrowthRate value={getRelativeGrowthRate("daily")(project)} />
          <br />
          1w <StarDelta delta={getStarsAddedThisWeek(project)} />{" "}
          <RelativeGrowthRate
            value={getRelativeGrowthRate("weekly")(project)}
          />
          <br />
          1m <StarDelta delta={getStarsAddedThisMonth(project)} />{" "}
          <RelativeGrowthRate
            value={getRelativeGrowthRate("monthly")(project)}
          />
          <br />
          1y <StarDelta delta={getStarsAddedThisYear(project)} />{" "}
          <RelativeGrowthRate
            value={getRelativeGrowthRate("yearly")(project)}
          />
        </Cell>
        <Cell />
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
