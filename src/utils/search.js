export default function search(projects, text) {
  return projects
    .map(project => ({ ...project, rank: rank(project, text) }))
    .filter(project => project.rank > 0)
    .sort((a, b) => {
      if (a.rank === b.rank) {
        return a.stars > b.stars ? -1 : 1;
      }
      return a.rank > b.rank ? -1 : 1;
    });
}

// for a given project and a given search text,
// return how much "relevant" is the project in the search results
function rank(project, text) {
  const re1 = new RegExp("^" + text, "i");
  const re2 = new RegExp(text, "i");

  // top level relevance: project whose name or npm package name starts by the text
  if (
    re1.test(project.name) ||
    (project.packageName && re1.test(project.packageName))
  ) {
    return 5;
  }

  // next level: check if the project names contains the text
  if (text.length > 1) {
    if (re2.test(project.name)) {
      return 4;
    }
  }

  if (re2.test(project.full_name)) {
    return 3;
  }

  if (text.length > 2) {
    if (re2.test(project.description)) {
      return 2;
    }
    if (re2.test(project.url)) {
      return 1;
    }
  }

  // by default: the project is not included in search results
  return 0;
}
