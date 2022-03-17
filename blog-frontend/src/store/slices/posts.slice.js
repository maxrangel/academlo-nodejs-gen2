import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: [],
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		getPosts: (state, action) => {},
		addPost: state => {},
		editPost: (state, action) => {},
		deletePost: (state, action) => {},
	},
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
