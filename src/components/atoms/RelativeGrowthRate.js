import React from "react";
import { styled } from "baseui";

const Span = styled("span", ({ $theme }) => ({
  color: $theme.colors.mono700
}));

const RelativeGrowthRate = ({ value }) => {
  if (!value) return null;
  return <Span>{(value * 100).toFixed(1)}%</Span>;
};

export default RelativeGrowthRate;
