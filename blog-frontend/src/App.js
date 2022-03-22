import { Routes, Route } from 'react-router-dom';
// Pages
import Home from './pages/home/home.page';
import Auth from './pages/auth/auth.page';
import AddPost from './pages/add-post/add-post.page';

// Components
import Header from './components/UI/header/header.component';

import './App.css';

const App = () => {
	return (
		<div>
			<Header />

			<Routes>
				<Route index path="/" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/add-post" element={<AddPost />} />
			</Routes>
		</div>
	);
};

export default App;
