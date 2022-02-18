import './css/image.css';

export default function Image ({src, className, onClick}) {
	return(
		<img src={src} className={className} onClick={onClick}/>
	);
}