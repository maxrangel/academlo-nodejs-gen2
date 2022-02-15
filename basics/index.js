// Create HTTP server
const http = require('http');

const server = http.createServer((request, response) => {
	console.log('NodeJS server running!');

	const userData = { name: 'Max', age: 23 };

	response.write(JSON.stringify(userData));

	response.end();
});

// localhost:4000
server.listen(4000);
