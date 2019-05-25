import React, { useEffect, useState } from "react";

export const ProjectListContext = React.createContext();

const { Provider, Consumer } = ProjectListContext;

const loadJson = url => fetch(url).then(res => res.json());

export const sortBy = (fn, direction = 1) => items => {
  const clonedItems = items.filter(item => fn(item) !== undefined).slice();
  clonedItems.sort((a, b) => {
    const diff = fn(b) - fn(a);
    if (!diff) return 0;
    return diff > 0 ? -direction : direction;
  });
  return clonedItems;
};

export const stars = project => project.stars;

export const starsAddedYesterday = ({ deltas }) => deltas[0];

export const starsAddedThisWeek = ({ deltas }) =>
  deltas.reduce((acc, val) => acc + val, 0);

export const starsAddedThisMonth = ({ monthly }) => {
  const lastIndex = monthly.length - 1;
  if (lastIndex < 2) return undefined;
  return monthly[lastIndex] - monthly[lastIndex - 1];
};

export const starsAddedThisYear = ({ monthly }) => {
  if (monthly.length < 7) return undefined;
  return monthly[6] - monthly[0];
};

export const sortByStars = sortBy(item => item.stars);
export const sortWeeklyTrend = sortBy(starsAddedThisWeek);

export const ProjectListProvider = ({ children }) => {
  const [{ projects, tags }, setData] = useState({ projects: [], tags: [] });
  useEffect(() => {
    const loadProjects = async () => {
      const url = "https://bestofjs-api-v2.firebaseapp.com/projects.json";
      const { projects, tags } = await loadJson(url);
      setData({ projects, tags });
    };
    loadProjects();
  }, []);
  return <Provider value={{ projects, tags }}>{children}</Provider>;
};

export const ProjectListConsumer = Consumer;
