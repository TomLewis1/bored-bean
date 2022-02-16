import './css/title.css';

export default function Title (props) {
    return(
        <p className={props.className}>
            {props.text}
        </p>
    );
}