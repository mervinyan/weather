import { getData } from "./index";

import { FETCH_PHOTOS, GALLERY_ERROR } from "./types";

export function fetchPhotos() {
  let url = process.env.REACT_APP_API_BASE_URL + "/photo";
  return dispatch => getData(FETCH_PHOTOS, GALLERY_ERROR, url, dispatch);
}