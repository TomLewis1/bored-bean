import './App.css';
import React, { useState, useEffect } from 'react';
import Checkbox from './components/checkbox';
import Title from './components/title';
import Button from './components/button';
import Header from './components/header';
import Footer from './components/footer';
import Paragraph from './components/paragraph';

export default function App() {

	//Set activity types
	const activityTypes = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];
	
	//const vars
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState({});
	const [selectedActivityTypes, setActivityType] = useState(activityTypes);
	const [showSelectButton, setButtonShow] = useState(false);

	//Run API func
	const getAPI = (searchType) => {

		let APIurl = 'https://www.boredapi.com/api/activity/';
		if(searchType === 'selected'){
			let getType = selectedActivityTypes[Math.floor(Math.random()*selectedActivityTypes.length)]
			APIurl += ((getType) ? `?type=${getType}` : '');
		}

		fetch(APIurl)
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}

	//Run api call on load
	useEffect(() => {
		getAPI();
	},[])

	//Add/Remove activity types
	const changeActivityTypes = (e) => {
		let activityValue = e.target.value;
		if(e.target.checked){
			//If checked, add
			if(!(selectedActivityTypes.indexOf(activityValue) > -1)){
				//Add new type and all other types
				setActivityType([activityValue,...selectedActivityTypes]);
			}
		} else {
			//If unchecked, remove
			if((selectedActivityTypes.indexOf(activityValue) > -1)){
				//filter array to remove only selected value
				setActivityType(selectedActivityTypes.filter(function(type) { 
					return type !== activityValue 
				}));
			}
		}

		//show/hide buttons
		console.log("All types "+activityTypes.length);
		console.log("Selected types "+selectedActivityTypes.length);
		if(activityTypes.length === selectedActivityTypes.length || selectedActivityTypes.length === 0){
			setButtonShow(false);
		} else {
			setButtonShow(true);
		}

	}

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<div>
					<Header text="BORED."/>
				</div>

				<div className="main-content">

					<Title text="Are you bored?" className="main-title"/>
					<Title text={items.activity} className="activity-title"/>

					<Paragraph text="Select your desired area(s) below and we will provide you with suggestions on how to fight the boredum." className="activity-paragraph" />

					<div className="type-container">
						{activityTypes.map((type) =>
							<div className="type-item">
							<Checkbox value={type} setChecked={true} clickAction={changeActivityTypes} key={type} />
							</div>
						)}
					</div>

					<div className="button-container">
						{showSelectButton && (<Button className="activity-button-secondary" clickAction={() => getAPI('selected')} text="Search Selected" />)}
						<Button className="activity-button" clickAction={() => getAPI('all')} text="Search All" />
					</div>

				</div>

				<div>
					<Footer text="Created by Tom"/>
				</div>
			</>
		);
	}
}
