import './css/button.css';

export default function Button (props) {
	return(
		<button className={props.className} onClick={props.clickAction}>{props.text}</button>
	);
}