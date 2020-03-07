import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { fetchWeather } from "./weather";
import { FETCH_CITIES, FETCH_WEATHER, WEATHER_ERROR } from "./types";

const mockStore = configureMockStore([thunk, promiseMiddleware]);

describe("Weather Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: { weather: {} }
    });
  });

  describe("fetchWeather action creator", () => {
    it("dispatches FETCH_WEATHER action and returns data on success", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
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
            }
          }
        })
      );

      await store.dispatch(fetchWeather());
      const actions = store.getActions();
      expect(actions[0].type).toEqual(FETCH_WEATHER);
      expect(actions[0].payload.weather.placecode).toEqual("CAON0103");
    });

    it("dispatches FETCH_WEATHER action and returns an error", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error: "Something bad happened :("
        })
      );

      try {
        await store.dispatch(fetchWeather());
      } catch {
        const actions = store.getActions();
        console.log(actions);
        expect.assertions(3);
        expect(actions[0].type).toEqual("FETCH_PHOTOS_PENDING");
        expect(actions[0].type).toEqual("FETCH_PHOTOS_REJECTED");
        expect(actions[0].payload.error).toEqual("Something bad happened :(");
      }
    });
  });
});
