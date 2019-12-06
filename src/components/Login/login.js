import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
import { Link } from 'react-router-dom';
const loginService=require('../../Services/authentication.service');
export default function Login(props) {
	const username = useFormDetails(props.location.state === undefined ? '' : props.location.state.user);
	const password = useFormDetails('');
	const [ formvalidation, setFormValidation ] = useState('');

	const Inputfocus = useRef(null);

	useEffect(() => {
		Inputfocus.current.focus();
	}, []);
	useDocumentTitle('Login');

	function handleSubmit(e) {
		if (username.value.length < 1) {
			setFormValidation('Username required');
			e.preventDefault();
			return;
		}
		if (password.value.length < 1) {
			setFormValidation('Password required');
			e.preventDefault();
			return;
		}
		
		setFormValidation('');
		var loginData = {
			username: username.value.trim(),
			password: password.value.trim()
		};
		//call Api to validate user

		loginService.login(loginData.username,loginData.password)
		.then((response)=>{
			if (JSON.stringify(response).includes('Username or password incorrect'))
						setFormValidation('Username or Password Incorrect');
			else
						// Navigate to DashBoard
				return props.history.push('/DashBoard', { user: response });
		}).catch(err=>{
			console.log(err);

		})
		e.preventDefault();
		
			
	}
	return (
		<div className="row">
			<div className="col-md-4 loginPageMarginBanner">
				{/* <img src={clinicalimg} alt={'Landing Page'} style={{ width: '50%',height:'100%' }} /> */}
			</div>

			<div className="col-lg-4 loginPageMarginTop" style={{border:'10px solid darkgrey',borderRadius:'20px'}}>
				<h3>User Login</h3>
				<p className={formvalidation.trim() !== '' ? 'alert alert-danger LoginInputTextSize' : ''}>
					{formvalidation}
				</p>
				<form onSubmit={handleSubmit}>
					<span className="logintextheader">Username</span>&nbsp;
					<input
						type="text"
						ref={Inputfocus}
						value={username.value}
						onChange={username.onChange}
						className="form-control LoginInputTextSize"
						placeholder="Enter Username"
					/>
					<span className="logintextheader">Password</span>&nbsp;
					<input
						type="password"
						value={password.value}
						onChange={password.onChange}
						className="form-control LoginInputTextSize"
						placeholder="Enter Password"
					/>
					<br />					
					<button className="btn btn-primary loginbutton">Login</button>
					<br />
					<br />
					
					<span className="loginbutton">
						Forgot Password? Click <Link to="/ForgotPassword">Here</Link>
					</span>&nbsp;
				</form>
			</div>
			<div className="col-md-4 loginPageMarginBanner">
				{/* <img src={clinicalimg} alt={'Landing Page'} style={{ width: '50%',height:'100%' }} /> */}
			</div>
		</div>
	);
}

function useFormDetails(initialInput) {
	const [ value, setValue ] = useState(initialInput);

	function handleChange(e) {
		setValue(e.target.value);
	}
	return {
		value,
		onChange: handleChange
	};
}

function useDocumentTitle(Title) {
	useEffect(() => {
		document.title = Title;
	});
}
