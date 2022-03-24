import axios from 'axios';

import { postsActions } from '../slices/posts.slice';

export const fetchPosts = () => {
	return async dispatch => {
		try {
			const token = sessionStorage.getItem('token');

			const response = await axios.get(`http://localhost:4000/api/v1/posts`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const { posts } = response.data.data;

			console.log(posts);

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const addPost = postData => {
	return async dispatch => {
		try {
			const token = sessionStorage.getItem('token');

			const response = await axios.post(
				`http://localhost:4000/api/v1/posts`,
				postData,
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			const { newPost } = response.data.data;

			dispatch(postsActions.addPost({ newPost }));
		} catch (error) {
			console.log(error);
		}
	};
};
