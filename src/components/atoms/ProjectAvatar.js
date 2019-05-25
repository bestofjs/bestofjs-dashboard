import React from "react";

/*
Return the image URL to be displayed inside the project card
Can be either :
* the GitHub owner avatar (by default if no `icon` property is specified)
* A custom SVG file if project's `icon`property is specified.
The SVG can be stored locally (inside `www/logos` folder) or in the cloud.
*/
export function getProjectAvatarUrl(project, size) {
  return project.icon
    ? formatIconUrl(project.icon)
    : formatOwnerAvatar(project.owner_id, size);
}

const isUrl = input => input.startsWith("http");

const formatIconUrl = input =>
  isUrl(input) ? input : `https://bestofjs.org/logos/${input}`;

const formatOwnerAvatar = (owner_id, size) =>
  `https://avatars.githubusercontent.com/u/${owner_id}?v=3&s=${size}`;

export const ProjectAvatar = ({ project, size = 100 }) => {
  const { svg } = project;
  if (svg)
    return (
      <div style={{ width: size }} dangerouslySetInnerHTML={{ __html: svg }} />
    );
  const url = getProjectAvatarUrl(project, size);
  return <img src={url} width={size} height={size} alt={project.name} />;
};
