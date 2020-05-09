import React, { useEffect, useState } from "react";

export const ProjectListContext = React.createContext();

const { Provider, Consumer } = ProjectListContext;

const loadJson = (url) => fetch(url).then((res) => res.json());

export const sortBy = (fn, direction = 1) => (items) => {
  const clonedItems = items.filter((item) => fn(item) !== undefined).slice();
  clonedItems.sort((a, b) => {
    const diff = fn(b) - fn(a);
    if (!diff) return 0;
    return diff > 0 ? -direction : direction;
  });
  return clonedItems;
};

export const ProjectListProvider = ({ children }) => {
  const [{ projects, tags, isLoading }, setData] = useState({
    projects: [],
    tags: [],
    isLoading: true,
  });
  useEffect(() => {
    const loadProjects = async () => {
      const url = "https://bestofjs-static-api.now.sh/projects.json";
      const { projects, tags } = await loadJson(url);
      setData({ projects, tags, isLoading: false });
    };
    loadProjects();
  }, []);
  return <Provider value={{ projects, tags, isLoading }}>{children}</Provider>;
};

export const ProjectListConsumer = Consumer;
