import userReducer from './userReducer';
import windowReducer from './windowReducer';
import modalsReducer from './modalsReducer';

export const rootReducer = {
  user: userReducer,
  window: windowReducer,
  modals: modalsReducer
}
