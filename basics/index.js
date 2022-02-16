const http = require('http');

const users = [
	{ name: 'Max', age: 23 },
	{ name: 'John', age: 22 },
	{ name: 'Jill', age: 21 },
];

const posts = [
	{ id: 1, title: 'Post 1', content: 'Some content' },
	{ id: 2, title: 'Post 2', content: 'Some content 2' },
	{ id: 3, title: 'Post 3', content: 'Some content 3' },
];

// Create HTTP server
const server = http.createServer((request, response) => {
	const url = request.url;
	const method = request.method;
	const paramsIndex = url.lastIndexOf('/');
	const hasId = paramsIndex > 0;

	// Endpoints
	if (method === 'GET' && url === '/users') {
		response.write(JSON.stringify(users));
	} else if (url === '/posts' && method === 'GET') {
		response.write(JSON.stringify(posts));
	} else if (url === '/posts' && method === 'POST') {
		// Save a new post

		// title=New post&content=This is a new post -> Buffer
		const postData = [];

		request.on('data', chunk => {
			postData.push(chunk);
		});

		request.on('end', () => {
			// id=1&title=New post&content=This is a new post
			const parsedData = Buffer.concat(postData).toString();
			console.log(parsedData);

			// Split string by &
			// Extract title and content value
			// Create new post (pass the title and the content)
			// Send the new post to the client
		});

		const newPost = {
			id: Math.floor(Math.random() * 1000),
			title: 'New post',
			content: 'This is a new post',
		};

		posts.push(newPost);

		response.write('A new post has been added');
	} else if (method === 'GET' && url.includes('/posts') && hasId) {
		const postId = url.slice(paramsIndex + 1);

		const post = posts.find(post => {
			return post.id === +postId;
		});

		if (!post) {
			response.write('No post found with the given id');
		} else {
			response.write(JSON.stringify(post));
		}
	} else {
		response.write('No data found!');
	}

	response.end();
});

// http://localhost:4000
server.listen(4000);
