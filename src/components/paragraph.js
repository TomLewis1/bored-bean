import './css/paragraph.css';

export default function Paragraph ({text,className}) {
	return(
		<p className={className}>{text}</p>
	);
}