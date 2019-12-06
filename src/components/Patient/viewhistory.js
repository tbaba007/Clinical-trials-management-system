import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
import ViewHistorydetails from './viewHistoryDetails';
const medicalHistoryHelper=require('../../Services/medicalhistory.service');
export default function ViewHistory(props) {
	
	const [ medicalhistory, setMedicalHistory ] = useState([]);
	const [ isDivOpen, setDivOpen ] = useState(false);
	const [medicalDetails,setMedicalDetails]=useState(null);
	function toggle(e,id) {
		setMedicalDetails(id); 
		if (!isDivOpen) setDivOpen(true);
		else setDivOpen(false);
	}
	useEffect(() => {
		const fetchMedicalDetailsById = () => {
			medicalHistoryHelper.getDetailsById(props.userdetals.userdata.patient.id)
			
				.then((success) => {
					setMedicalHistory(success);
				})
				.catch((err) => {
					alert(err.message);
				});
		};
		fetchMedicalDetailsById();
	}, [props.userdetals.userdata.patient.id]);

	return (
		<div style={{ overflowY: 'scroll' }}>
			<h6 style={{ float: 'left' }}>Medical History for {props.userdetals.userdata.patient.name}</h6>
			<br />
			<div id="demo" className={'collapse' + (isDivOpen ? ' in' : '')}>
				<div>
					<ViewHistorydetails userdetals={props} medicalDetails={medicalDetails} />
				</div>
			</div>
			<table
				className="table"
				style={{ visibility: medicalhistory.length > 0 ? 'visible' : 'hidden', width: '100%' }}
			>
				<thead className="thead-dark">
					<tr>
						<th>S/N</th>
						<th>full Name</th>
						<th>Date Visited</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{medicalhistory !== undefined && medicalhistory.length > 0 ? (
						medicalhistory.map((users, index) => {
							return (
								<tr key={users.id}>
									<td key={index}>{index + 1}</td>
									<td key={users.patient.name}>{users.patient.name}</td>
									<td key={users.datevisited}>{users.datevisited}</td>
									<td key="delete">
										<button className="btn btn-info" onClick={()=>toggle(this,users)}>View details</button>
									</td>
								</tr>
							);
						})
					) : (
						'No Medical History Found'
					)}
				</tbody>
			</table>
		</div>
	);
}
