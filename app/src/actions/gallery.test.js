import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { fetchPhotos } from "./gallery";
import { FETCH_PHOTOS, GALLERY_ERROR } from "./types";

const mockStore = configureMockStore([thunk, promiseMiddleware]);

describe("Gallery Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: { photoUrls: [] }
    });
  });

  describe("fetchPhotos action creator", () => {
    it("dispatches FETCH_PHOTOS action and returns data on success", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: { photoUrls: ["photo_001.jpeg", "photo_002.jpeg"] }
        })
      );

      await store.dispatch(fetchPhotos());
      const actions = store.getActions();
      expect(actions[0].type).toEqual(FETCH_PHOTOS);
      expect(actions[0].payload.photoUrls[0]).toEqual("photo_001.jpeg");
      expect(actions[0].payload.photoUrls[1]).toEqual("photo_002.jpeg");
    });

    it("dispatches FETCH_PHOTOS action and returns an error", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error: "Something bad happened :("
        })
      );

      try {
        await store.dispatch(fetchPhotos());
      } catch {
        const actions = store.getActions();
        console.log(actions);
        expect.assertions(3);
        expect(actions[0].type).toEqual("FETCH_PHOTOS_PENDING");
        expect(actions[1].type).toEqual("FETCH_PHOTOS_REJECTED");
        expect(actions[1].payload.error).toEqual("Something bad happened :(");
      }
    });
  });
});
