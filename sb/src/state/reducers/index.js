import userReducer from './userReducer';
import windowReducer from './windowReducer';
import modalsReducer from './modalsReducer';
import postsReducer from './postsReducer';

export const rootReducer = {
  user: userReducer,
  window: windowReducer,
  modals: modalsReducer,
  posts: postsReducer
}
