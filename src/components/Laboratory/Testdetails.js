import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
const labResult=require('../../Services/laboratory.service');
export default function TestDetails(props) {
	const [ testResult, setTestResult ] = useState('');

	const Inputfocus = useRef(null);
	useEffect(() => {
		Inputfocus.current.focus();
	}, []);
	
	
	function handleTestResultChange(e) {
		
		setTestResult(e.target.value);
    }
    
	const Send = (e) => {

        if(testResult.trim()==='')
        {
            return alert('Enter Test Result');
        }


		var patientData = {
			 
            patientid:props.userdata.patient.id,
             testrecommendedby:props.userdata.doctorvisited,
             testdetails:props.userdata.testdetails,
             testupload:testResult,
             uploadedby:props.loggedinuser.location.state.props.user.id,
             testdobneby:props.loggedinuser.location.state.props.user.id,
             datedone:new Date().getFullYear() +
             '-' +
             (parseInt(new Date().getMonth().toString()) + 1) +
             '-' +
             new Date().getDate(),
             medicalhistoryid:props.userdata.id,
             istesttaken:'TRUE'
            
            
        };
		labResult.addTestResult(patientData)
			.then((success) => {
				alert('Details saved successfully!');
				window.location.reload(true);
			})
			.catch((err) => {
				alert('An error occured while processing your request!.');
			});
	};

	return (
		<React.Fragment>
			<h3>Test Details For {props.userdata.patient.name}</h3>
			<div className="row">
				<div className="col-lg-5">
					<br />
					Name : <label style={{ fontWeight: 'bold' }}>{props.userdata.patient.name}</label>
					<br />
					Email Address : <label style={{ fontWeight: 'bold' }}>{props.userdata.patient.email}</label>
					<br />
					Mobile Number : <label style={{ fontWeight: 'bold' }}>{props.userdata.patient.mobilenumber}</label>
					<br />
					Current BP: <label style={{ fontWeight: 'bold' }}>{props.userdata.bp}</label>
					<br />
					Current Weight: <label style={{ fontWeight: 'bold' }}>{props.userdata.weight}</label>
				</div>

				<div className="col-lg-5">
					<br />
					Complaint : <label style={{ fontWeight: 'bold' }}>{props.userdata.complaints}</label>
					<br />
					Test Details : <label style={{ fontWeight: 'bold' }}>{props.userdata.testdetails}</label>
					<br />
					Enter Result :{' '}
					<textarea
						className="form-control"
						ref={Inputfocus}
						value={testResult}
						onChange={handleTestResultChange}
					/>
					
					<br />
				</div>
			</div>
			<button className="btn btn-success" onClick={() => Send()}>
				Send To Doctor
			</button>
		</React.Fragment>
	);
}
