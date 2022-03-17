// Reducers
import userReducer from './slices/user.slice';
import postsReducer from './slices/posts.slice';

const rootReducer = {
	user: userReducer,
	posts: postsReducer,
};

export default rootReducer;
