import { FETCH_WEATHER, FETCH_CITIES, WEATHER_ERROR } from "../actions/types";

const INITIAL_STATE = { message: "", error: "" };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, weather: action.payload };
    case FETCH_CITIES:
      return { ...state, cities: action.payload.cities };
    case WEATHER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
