import weather_reducer from "./weather_reducer";
import { FETCH_WEATHER, WEATHER_ERROR } from "../actions/types";

describe("Weather Reducer", () => {
  const initialState = {
    error: "",
    message: ""
  };

  it("returns the initial state when an action type is not passed", () => {
    const reducer = weather_reducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it("handles FETCH_WEATHER as expected", () => {
    const reducer = weather_reducer(initialState, {
      type: FETCH_WEATHER,
      payload: {
        lbl_updatetime: "Updated on",
        updatetime: "Thu Mar 5 8:15 PM",
        updatetime_stamp_gmt: "1583457300000",
        wxcondition: "Mostly Cloudy",
        icon: "21",
        inic:
          "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAMAAADzjKfhAAAARVBMVEUAAACpr5+/wMDKy8uXnozU1dbCwsSvtaB8gnW/wb21uLGlrJj5+frw8fHi4+XW19nFxsbAwMDg4OGtrqzU1daPkIzq6usR0At1AAAAFnRSTlMAzsWeVUpKJwz8/PDs68jAqYdPOh4cDyd82AAAADJJREFUCNc1xbcBACAMAzDTe4f8fyphQIvwmA3YsWYuBirIStRwRJRdWUAnoT2Yc9x3ASpgATizz5L7AAAAAElFTkSuQmCC",
        temperature: 32,
        feels_like: 27,
        temperature_unit: "F",
        placecode: "CAON0103"
      }
    });

    expect(reducer).toEqual({
      weather: {
        lbl_updatetime: "Updated on",
        updatetime: "Thu Mar 5 8:15 PM",
        updatetime_stamp_gmt: "1583457300000",
        wxcondition: "Mostly Cloudy",
        icon: "21",
        inic:
          "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAMAAADzjKfhAAAARVBMVEUAAACpr5+/wMDKy8uXnozU1dbCwsSvtaB8gnW/wb21uLGlrJj5+frw8fHi4+XW19nFxsbAwMDg4OGtrqzU1daPkIzq6usR0At1AAAAFnRSTlMAzsWeVUpKJwz8/PDs68jAqYdPOh4cDyd82AAAADJJREFUCNc1xbcBACAMAzDTe4f8fyphQIvwmA3YsWYuBirIStRwRJRdWUAnoT2Yc9x3ASpgATizz5L7AAAAAElFTkSuQmCC",
        temperature: 32,
        feels_like: 27,
        temperature_unit: "F",
        placecode: "CAON0103"
      },
      error: "",
      message: ""
    });
  });
});
