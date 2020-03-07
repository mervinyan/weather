import axios from 'axios';

export function errorHandler(dispatch, error, type) {

  let errorMessage = error.data;

  dispatch({
    type,
    payload: errorMessage
  });
}

export function postData(action, errorType, url, dispatch, data, callback) {
  let headers = {};

  axios.post(url, data, headers)
    .then((response) => {
      callback && callback()
      dispatch({
        type: action,
        payload: response.data,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}

export function getData(action, errorType, url, dispatch, callback) {
  let headers = {};

  axios.get(url, headers)
    .then((response) => {
      callback && callback();
      dispatch({
        type: action,
        payload: response.data,
      });
    })
    .catch((error) => { 
      if (error.response) {
        errorHandler(dispatch, error.response, errorType);
      }
    });
}

export function patchData(action, errorType, url, dispatch, data, callback) {
  let headers = {};

  axios.patch(url, data, headers)
    .then((response) => {
      callback && callback();
      dispatch({
        type: action,
        payload: response.data,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}

export function putData(action, errorType, url, dispatch, data) {
  let headers = {};

  axios.put(url, data, headers)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}

export function deleteData(action, errorType, url, dispatch) {
  let headers = {};

  axios.delete(url, headers)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}