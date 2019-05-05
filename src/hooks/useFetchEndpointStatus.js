import { useFetch } from "react-async";

export default function useFetchEndpointStatus(url) {
  const headers = { Accept: "application/json" };
  const {startedAt, finishedAt, ...result} = useFetch(url, { headers });
  const responseTime = finishedAt - startedAt;
  return {...result, responseTime}
}

/*
  Data returned by `react-async`
  data {any} last resolved promise value, maintained when new error arrives
  error {Error} rejected promise reason, cleared when new data arrives
  isLoading {boolean} true while a promise is pending
  startedAt {Date} when the current/last promise was started
  finishedAt {Date} when the last promise was resolved or rejected
  cancel {Function} ignores the result of the currently pending promise
  run {Function} runs the deferFn, passing any arguments provided
  reload {Function} re-runs the promise when invoked, using the previous arguments
  setData {Function} sets data to the passed value, unsets error and cancels any pending promise
  setError {Function} sets error to the passed value and cancels any pending promise

*/