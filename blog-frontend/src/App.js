import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// Redux actions
import { checkUserAuth } from './store/actions/user.actions';

// Pages
import Home from './pages/home/home.page';
import Auth from './pages/auth/auth.page';
import AddPost from './pages/add-post/add-post.page';

// Components
import Header from './components/UI/header/header.component';

import './App.css';

const App = () => {
	const isAuth = useSelector(state => state.user.isAuth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) navigate('/auth');
		else navigate('/');
	}, [isAuth, navigate]);

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch]);
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
