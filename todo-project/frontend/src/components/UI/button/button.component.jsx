import classes from './button.styles.module.css';

const Button = ({ onClick, type, label }) => {
	return (
		<button
			onClick={onClick}
			type={type || 'submit'}
			className={classes.button}
		>
			{label}
		</button>
	);
};

export default Button;
