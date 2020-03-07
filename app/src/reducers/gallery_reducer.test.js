import gallery_reducer from "./gallery_reducer";
import { FETCH_PHOTOS, GALLERY_ERROR } from '../actions/types';

describe("Gallery Reducer", () => {
  const initialState = {
    error: "",
    message: ""
  };

  it("returns the initial state when an action type is not passed", () => {
    const reducer = gallery_reducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it("handles FETCH_PHOTOS as expected", () => {
    const reducer = gallery_reducer(initialState, {
      type: FETCH_PHOTOS,
      payload: {
         photoUrls: ["photo_001.jpeg", "photo_002.jpeg"] 
      },
    });

    expect(reducer).toEqual({
      photoUrls: ["photo_001.jpeg", "photo_002.jpeg"],
      error: "",
      message: ""
    });
  });
});
