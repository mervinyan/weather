import { combineReducers } from 'redux';  
import { connectRouter } from 'connected-react-router';
import weatherReducer from './weather_reducer';
import galleryReducer from './gallery_reducer';

const rootReducer = (history) => combineReducers({  
  router: connectRouter(history),
  weather: weatherReducer,
  gallery: galleryReducer
});

export default rootReducer;  
