export const getStarTotal = project => project.stars;

export const getStarsAddedYesterday = ({ trends }) => trends.daily;

export const getStarsAddedThisWeek = ({ trends }) => trends.weekly

export const getStarsAddedThisMonth = ({ trends }) => trends.monthly;

export const getStarsAddedThisYear = ({ trends }) => trends.yearly;

export const getLastCommitDate = project => new Date(project.pushed_at);
