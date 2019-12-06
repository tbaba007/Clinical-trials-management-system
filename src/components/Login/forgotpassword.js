import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
import { Link } from 'react-router-dom';
const resetPasswordService=require('../../Services/authentication.service');
export default function ForgotPassword(props) {
	const [ username, setUserName ] = useState('');
	const [ formvalidation, setValidation ] = useState('');
	const [ successMessage, setSuccessmessage ] = useState('');
	const InputFocus= useRef(null);
	useEffect(() => {
		document.title = 'Forgot Password';
		InputFocus.current.focus();
	});
	function handleUserNameChange(e) {
		setValidation('');
		setUserName(e.target.value);
	}

	function handleSubmit(e) {
		if (username.length < 1) {
			setValidation('Username or email required');
			e.preventDefault();
			return;
		}

		setValidation('');
		//Post details to API to reset Password
		resetPasswordService.resetpassword(username)
		.then((success)=>{
			debugger;
				if (success === 'OK') {
					setSuccessmessage(
						'Password Reset Successfully!. Kindly use user1 to login ' +
							'and change your password there after.'
					);
					setTimeout(() => {
						return props.history.push('/Login', { user: username });
					}, 5000);
				} else {
					setValidation('Username not found');
				}
			})
			.catch((err) => {
				debugger;
				setValidation('An error occured while trying to change the password');
			});
		e.preventDefault();
		
		
	}
	return (
		<div className="row">
			<div className="col-md-4 loginPageMarginBanner">
				{/* <img src={clinicalimg} alt={'Landing Page'} style={{ width: '50%' }} /> */}
			</div>

			<div className="col-lg-4 loginPageMarginTop" style={{border:'1px solid black',borderRadius:'20px'}}>
				<h3>Reset Password</h3>
				<p className={formvalidation.trim() !== '' ? 'alert alert-danger LoginInputTextSize' : ''}>
					{formvalidation}
				</p>
				<p className={successMessage.trim() !== '' ? 'alert alert-info LoginInputTextSize' : ''}>
					{successMessage}
				</p>
				<form onSubmit={handleSubmit}>
					<span className="logintextheader">Username</span>&nbsp;
					<input
						type="text"
						value={username}
						onChange={handleUserNameChange}
						className="form-control LoginInputTextSize"
						placeholder="Enter Username"
						ref={InputFocus}
					/>
					<br />
					<button className="btn btn-primary loginbutton">Reset Password</button>
					<br />
					<br />
					<span className="loginbutton">
						Click <Link to="/Login">Here</Link> To Login
					</span>&nbsp;<br />
				</form>
			</div>
			<div className="col-md-4 loginPageMarginBanner">
				{/* <img src={clinicalimg} alt={'Landing Page'} style={{ width: '50%',height:'100%' }} /> */}
			</div>
		</div>
	);
}
