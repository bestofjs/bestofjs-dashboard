import React from "react";
import PropTypes from "prop-types";
import Async from "react-async";

/*
  <Async> child function is called passing the following parameters:
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

const FetchStatus = ({ url, children }) => {
  const loadJson = () => fetch(url).then(res => res.json());
  return (
    <Async promiseFn={loadJson}>
      {({ data, error, isLoading, reload, startedAt, finishedAt }) => {
        const responseTime = finishedAt - startedAt;
        return children({ data, error, isLoading, responseTime, reload });
      }}
    </Async>
  );
};

FetchStatus.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default FetchStatus;
