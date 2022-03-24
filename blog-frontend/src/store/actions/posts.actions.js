import axios from 'axios';

import { postsActions } from '../slices/posts.slice';

export const fetchPosts = () => {
	return async dispatch => {
		try {
			const token = sessionStorage.getItem('token');

			const response = await axios.get(`http://localhost:4000/api/v1/posts`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			const { posts } = response.data.data;

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
				{
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4MDg2MzI4LCJleHAiOjE2NDgwODk5Mjh9.8rZlilVunTPnpzzYf0hLjzCpzDCh8gkFG8YzKQ1fmws`,
					},
				}
			);

			const { newPost } = response.data.data;

			dispatch(postsActions.addPost({ newPost }));
		} catch (error) {
			console.log(error.data);
		}
	};
};
