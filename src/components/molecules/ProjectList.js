import React from "react";
import { FixedSizeList as List } from "react-window";
import styled from "styled-components";

import StarIcon from "../atoms/StarIcon";
import fromNow from "../../utils/fromNow";

const TableRow = styled.div`
  display: flex;
  flex: 0 0 100%;
`;

const Cell = styled.div`
  flexgrow: 1;
  padding: 1rem;
`;

const Row = ({ index, style, data }) => {
  const { name, stars, deltas, pushed_at, contributor_count } = data[index];
  return (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      <TableRow>
        <Cell style={{ width: 150 }}>{name}</Cell>
        <Cell style={{ width: 120, textAlign: "right" }}>
          <StarIcon /> {stars}
          <br />
          <StarDelta delta={deltas[0]} />
        </Cell>
        <Cell>
          {fromNow(pushed_at)}
          <br />
          {contributor_count} contributors
        </Cell>
      </TableRow>
    </div>
  );
};

const StarDelta = ({ delta }) => {
  if (delta === 0) return "=";
  if (delta < 0) return <span style={{ color: "red" }}>{delta}</span>;
  return <span>+ {delta}</span>;
};

const ProjectList = ({ projects }) => (
  <List
    itemData={projects}
    height={600}
    itemCount={projects.length}
    itemSize={100}
    width={"100%"}
    className="List"
  >
    {Row}
  </List>
);

export default ProjectList;
