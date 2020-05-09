import React from "react";
import { Select, TYPE } from "baseui/select";
import { FormControl } from "baseui/form-control";

import {
  getStarTotal,
  getStarsAddedYesterday,
  getStarsAddedThisWeek,
  getStarsAddedThisMonth,
  getStarsAddedThisYear,
  getLastCommitDate,
  getRelativeGrowthRate
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
    id: "hot-this-year",
    label: "Stars added this year",
    selector: getStarsAddedThisYear,
    direction: -1
  },
  {
    id: "cold-this-year",
    label: "Stars lost this year",
    selector: getStarsAddedThisYear,
    direction: 1
  },
  {
    id: "last-commit",
    label: "Last commit date",
    selector: getLastCommitDate,
    direction: 1
  },
  {
    id: "weekly-growth",
    label: "Weekly relative growth",
    selector: getRelativeGrowthRate("weekly"),
    direction: -1
  },
  {
    id: "monthly-growth",
    label: "Monthly relative growth",
    selector: getRelativeGrowthRate("monthly"),
    direction: -1
  },
  {
    id: "yearly-growth",
    label: "Yearly relative growth",
    selector: getRelativeGrowthRate("yearly"),
    direction: -1
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
