import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
import ViewHistory from './viewhistory';
const ComplaintHelper=require('../../Services/complaints.service');
export default function ComplaintDetails(props) {
	const [ testRequired, setTestRequired ] = useState('');
	const [ complaint, setComplaint ] = useState('');
	const [ testDetails, setTestDetails ] = useState('');
	const [ prescription, setPrescription ] = useState('');
	const [ isDivOpen, setDivOpen ] = useState(false);

	const Inputfocus = useRef(null);
	useEffect(() => {
		Inputfocus.current.focus();
	}, []);

	const handleComplaintChange = (e) => {
		setComplaint(e.target.value);
	};
	function handleIsTestRequired(e) {
		setTestRequired(e.target.value);
	}
	function handleIsTestDetails(e) {
		setTestDetails(e.target.value);
	}
	function handleSetPrescription(e) {
		setPrescription(e.target.value);
	}
	function toggle(e) {
		if (!isDivOpen) setDivOpen(true);
		else setDivOpen(false);
	}
	const Send = (e) => {
		if (complaint.trim() === '') {
			return alert('Enter patient complaint');
		}

		if (testRequired === '') {
			return alert('Select if test is required');
		}
		if (testRequired === 'Yes' && testDetails.trim() === '') {
			return alert('Enter test details');
		}
		if (testRequired === 'No' && prescription.trim() === '') {
			return alert('Enter patient prescription');
		}

		var patientData = {
			complaints: complaint,
			istestrequired: testRequired,
			prescription: prescription,
			testdetails: testDetails,
			//doctorvisited: props.loggedinuser.location.state.props.user.id,
			attendedto: testRequired === 'No' ? 'Yes' : 'No',
			actiontaken: testRequired === 'No' ? 'Patient Given Medication' : ''
		};
		ComplaintHelper.updateComplaint(props.userdata.id,patientData)
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
			<h3>Details for {props.userdata.patient.name}</h3>
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
					Complaint :{' '}
					<textarea
						className="form-control"
						ref={Inputfocus}
						value={complaint}
						onChange={handleComplaintChange}
					/>
					IsTestRequired? :<select
						className="form-control"
						value={testRequired}
						onChange={handleIsTestRequired}
					>
						<option>--select--</option>
						<option key="Yes" value="Yes">
							Yes
						</option>
						<option key="No" value="No">
							No
						</option>
					</select>
					<span
						style={{
							visibility: testRequired === 'Yes' ? 'visible' : 'hidden',
							display: testRequired === 'No' ? 'none' : ''
						}}
					>
						Test details :{' '}
						<textarea className="form-control" value={testDetails} onChange={handleIsTestDetails} />
					</span>
					<span
						style={{
							visibility: testRequired === 'No' ? 'visible' : 'hidden',
							display: testRequired === 'Yes' ? 'none' : ''
						}}
					>
						Prescription :{' '}
						<textarea className="form-control" value={prescription} onChange={handleSetPrescription} />
					</span>
				</div>
			</div>
			<button className="btn btn-success" onClick={() => Send()}>
				Send
			</button>{' '}
			<button className="btn btn-primary" onClick={toggle}>
				View Medical History
			</button>
			<div id="demo" className={'collapse' + (isDivOpen ? ' in' : '')}>
				<div>
					<ViewHistory userdetals={props} />
				</div>
			</div>
		</React.Fragment>
	);
}
