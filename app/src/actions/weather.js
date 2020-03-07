import { getData } from "./index";

import { FETCH_WEATHER, FETCH_CITIES, WEATHER_ERROR } from "./types";

import cities from "./cities.json";

export function fetchWeather(placeCode, temperatureUnit, callback) {
  const url = process.env.REACT_APP_WEATHER_NETWORK_API_BASE_URL + `/${placeCode}/${temperatureUnit}`;
  return dispatch => getData(FETCH_WEATHER, WEATHER_ERROR, url, dispatch, callback);
}

export function fetchCities() {
  return {
    type: FETCH_CITIES,
    payload: {cities: cities}
  }
}