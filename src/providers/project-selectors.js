export const getStarTotal = project => project.stars;

export const getStarsAddedYesterday = ({ deltas }) => deltas[0];

export const getStarsAddedThisWeek = ({ deltas }) =>
  deltas.reduce((acc, val) => acc + val, 0);

export const getStarsAddedThisMonth = ({ monthly }) => {
  const lastIndex = monthly.length - 1;
  if (lastIndex < 2) return undefined;
  return monthly[lastIndex] - monthly[lastIndex - 1];
};

export const getStarsAddedThisYear = ({ monthly }) => {
  if (monthly.length < 7) return undefined;
  return monthly[6] - monthly[0];
};

export const getLastCommitDate = project => new Date(project.pushed_at);
