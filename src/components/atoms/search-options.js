import React from "react";
import { Select, TYPE } from "baseui/select";
import { FormControl } from "baseui/form-control";

import {
  getStarTotal,
  getStarsAddedYesterday,
  getStarsAddedThisWeek,
  getStarsAddedThisMonth,
  getLastCommitDate
} from "../../providers/project-selectors";

export const sortOrderOptions = [
  {
    id: "popular",
    label: "Number of stars",
    selector: getStarTotal,
    direction: -1
  },
  {
    id: "hot-yesterday",
    label: "Stars added yesterday",
    selector: getStarsAddedYesterday,
    direction: -1
  },
  {
    id: "cold-yesterday",
    label: "Stars lost yesterday",
    selector: getStarsAddedYesterday,
    direction: 1
  },
  {
    id: "hot-this-week",
    label: "Stars added this week",
    selector: getStarsAddedThisWeek,
    direction: -1
  },
  {
    id: "cold-this-week",
    label: "Stars lost this week",
    selector: getStarsAddedThisWeek,
    direction: 1
  },
  {
    id: "hot-this-month",
    label: "Stars added this month",
    selector: getStarsAddedThisMonth,
    direction: -1
  },
  {
    id: "cold-this-month",
    label: "Stars lost this month",
    selector: getStarsAddedThisMonth,
    direction: 1
  },
  {
    id: "last-commit",
    label: "Last commit date",
    selector: getLastCommitDate,
    direction: 1
  }
];

export const SortOrderPicker = ({ value, onChange }) => {
  return (
    <FormControl label="Sort order">
      <Select
        maxDropdownHeight="300px"
        type={TYPE.select}
        options={sortOrderOptions}
        value={value}
        clearable={false}
        searchable={false}
        onChange={({ value }) => onChange(value[0])}
      />
    </FormControl>
  );
};
