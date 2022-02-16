import './css/checkbox.css';

export default function Checkbox (props) {
	return(
		<label className="activity-type-label">
			<input type="checkbox" value={props.value} className="activity-type" onChange={props.clickAction} defaultChecked={props.setChecked} />
			{props.value}
		</label>
	);
}