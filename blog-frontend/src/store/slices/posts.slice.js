import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: [],
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		getPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		addPost: (state, action) => {
			const { newPost } = action.payload;
			const updatedPosts = state.posts.concat(newPost);

			state.posts = updatedPosts;
		},
	},
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
