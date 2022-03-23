import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

// Components
import Comment from '../comment/comment.component';

// Utils
import { storage } from '../../../utils/firebase';

import classes from './post-card.styles.module.css';

const PostCard = ({ post }) => {
	const [expanded, setExpanded] = useState(false);
	const [imgUrl, setImgUrl] = useState('');

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		const downloadImg = async () => {
			const imgRef = ref(storage, post.imgUrl);

			const imgUrl = await getDownloadURL(imgRef);

			setImgUrl(imgUrl);
		};

		downloadImg();
	}, [post.imgUrl]);

	return (
		<Card className={classes['card']}>
			<CardHeader
				title="Title of the post"
				subheader="Author: September 14, 2016"
			/>
			<CardMedia component="img" height="194" image={imgUrl} alt="Post img" />
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					Post description
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Typography
					onClick={handleExpandClick}
					variant="body2"
					color="text.secondary"
				>
					Show comments
				</Typography>
				<IconButton
					className={
						expanded
							? classes['expand-icon--show']
							: classes['expand-icon--hide']
					}
					onClick={handleExpandClick}
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			{/* Comments section */}
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<div className={classes['comment__input-container']}>
						<Input placeholder="Your comment" />
						<Button>Submit</Button>
					</div>
					<Comment />
					<Comment />
					<Comment />
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default PostCard;
