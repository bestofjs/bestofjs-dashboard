import { useAsync } from "react-async";

export const config = {
  fetchProjectList: () => `https://bestofjs-static-api.now.sh/projects.json`,
  fetchHallOfFame: () => `https://bestofjs-static-api.now.sh/hof.json`,
  fetchReadMe: ({ fullName, branch = "master" }) =>
    `https://bestofjs-serverless.now.sh/api/project-readme?fullName=${fullName}&branch=${branch}`,
  fetchProjectDetails: ({ fullName }) =>
    `https://bestofjs-serverless.now.sh/api/project-details?fullName=${fullName}`,
};

export function fetchJSON({ url }, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then((r) => r.json());
}

function fetchHTML({ url }, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then((r) => r.text());
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function useFetchEndpointStatus(url, responseType = "json") {
  const promiseFn = responseType === "json" ? fetchJSON : fetchHTML;

  const { startedAt, finishedAt, ...result } = useAsync({ promiseFn, url });

  const responseTime = finishedAt - startedAt;
  return { ...result, responseTime };
}

export function useFetchProjectReadMe(fullName, branch = "master") {
  const url = config.fetchReadMe({ fullName, branch });
  return useAsync({ promiseFn: fetchHTML, watch: fullName, url });
}

/*
  Data provided by `react-async`:

  data: Last resolved promise value, maintained when new error arrives.
  error: Rejected promise reason, cleared when new data arrives.
  value: The value of data or error, whichever was last updated.
  initialValue: The data or error that was provided through the initialValue prop.
  startedAt: When the current/last promise was started.
  finishedAt: When the last promise was fulfilled or rejected.
  status: One of: initial, pending, fulfilled, rejected.
  isInitial: true when no promise has ever started, or one started but was cancelled.
  isPending: true when a promise is currently awaiting settlement. Alias: isLoading
  isFulfilled: true when the last promise was fulfilled with a value. Alias: isResolved
  isRejected: true when the last promise was rejected with a reason.
  isSettled: true when the last promise was fulfilled or rejected (not initial or pending).
  counter: The number of times a promise was started.
  cancel: Cancel any pending promise.
  run: Invokes the deferFn.
  reload: Re-runs the promise when invoked, using any previous arguments.
  setData: Sets data to the passed value, unsets error and cancels any pending promise.
  setError: Sets error to the passed value and cancels any pending promise.
*/
