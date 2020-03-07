import { FETCH_PHOTOS, GALLERY_ERROR } from '../actions/types';

const INITIAL_STATE = { message: '', error: ''};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PHOTOS:
      return { ...state, photoUrls: action.payload.photoUrls };
    case GALLERY_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
