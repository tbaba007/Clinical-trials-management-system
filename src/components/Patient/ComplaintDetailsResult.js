import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
import { Api } from '../../Helper/Api';
export default function ComplaintDetails(props) {
	
	const [ diseaseid, setDiseaseId ] = useState(0);
	const [ prescription, setPrescription ] = useState('');

	const Inputfocus = useRef(null);
	useEffect(() => {
		Inputfocus.current.focus();
	}, []);

	function handleDiseaseChange(e) {
		setDiseaseId(e.target.value);
	}
	function handleSetPrescription(e) {
	
		setPrescription(e.target.value);
	}
	const Send = (e) => {
		if (prescription.trim() === '') {
			return alert('Enter prescription');
		}

		if (diseaseid === 0) {
			return alert('Select disease diagnosed');
		}
		
		var patientData = {
			prescription:prescription,
			actiontaken:prescription,
			conditionid:diseaseid,
			attendedto:'TRUE'
		
		};
		fetch(Api + 'medicalhistory/doctorupdate/' + props.userdata.id, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(patientData)
		})
			.then((res) => res.text())
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
					Complaint : <label style={{ fontWeight: 'bold' }}>{props.userdata.complaints}</label>
					<br />
					Test Details : <label style={{ fontWeight: 'bold' }}>{props.userdata.testdetails}</label>
					<br />
					Test Result : <label style={{ fontWeight: 'bold' }}>{props.userdata.testresult.testupload}</label>
					<br />
					Diagnosed:<select  className="form-control" value={diseaseid} onChange={handleDiseaseChange}>
						<option key="0" value="0">
							--Select--
						</option>
						{props.diseases !== undefined && props.diseases.length > 0 ? (
							props.diseases.map((x) => {
								return (
									<option key={x.id} value={x.id}>
										{x.name}
									</option>
								);
							})
						) : (
							0
						)}
					</select>
					Prescription :{' '}
					<textarea
						className="form-control"
						ref={Inputfocus}
						value={prescription}
						onChange={handleSetPrescription}
					/>
					<br />
				</div>
			</div>
			<button className="btn btn-success" onClick={() => Send()}>
				Save
			</button>
		</React.Fragment>
	);
}
