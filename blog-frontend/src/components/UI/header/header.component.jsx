import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Redux actions
import { logout } from '../../../store/actions/user.actions';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = () => {
	// State (Redux)
	const isAuth = useSelector(state => state.user.isAuth);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Academlo Blog App
					</Typography>

					{/* Only show buttons if user is authenticated */}
					{isAuth && (
						<Fragment>
							<Button onClick={() => navigate('/add-post')} color="inherit">
								Add Post
							</Button>
							<Button onClick={() => navigate('/')} color="inherit">
								Home
							</Button>
							<Button onClick={logoutHandler} color="inherit">
								Log out
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
