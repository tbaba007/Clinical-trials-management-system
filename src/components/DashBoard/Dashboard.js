import React from 'react';
import Header from '../Header/header';
import {Redirect} from 'react-router-dom';

export default function DashBoard(props) {

	if(props===undefined)
	{
		return <Redirect to="/Login"/>
	}
	const {can_access}=props.location.state.user.role;

	
	return (
		<div>
			<Header user={props.location.state.user} role={can_access}/>
			<br />
			
		</div>
	);
}
