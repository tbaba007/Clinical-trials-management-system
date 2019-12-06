import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import Header from '../Header/header';
import ComplaintDetails from './ComplaintDetails';
import ComplaintDetailsResult from './ComplaintDetailsResult';
const diseaseHelper=require('../../Services/disease.service');
const complaintHelper=require('../../Services/complaints.service');
export default function ManageComplaints(props) {
	const [ complaintList, setComplaintList ] = useState([]);
	const [ conditionList, setConditionList ] = useState([]);
	const [ success, setSuccess ] = useState('');

	useEffect(() => {
		const fetDiseases = async () => {
			diseaseHelper.fetchDisease()
				.then((success) => {
					
					setConditionList(success);
				})
				.catch((err) => {});
		};
		fetDiseases();
	}, []);
	useEffect(() => {
		const fetchComplaintsToday = async () => {
			await complaintHelper.fetchComplaintsToday(new Date().getFullYear() +
					'-' +
					(parseInt(new Date().getMonth().toString()) + 1) +
					'-' +
					new Date().getDate()
			)
				
				.then((success) => {
					setComplaintList(success);
				})
				.catch((err) => {
					alert('An error occured while fetching complaints for today');
				});
		};
		fetchComplaintsToday();
	}, [success]);

	const Delete=(e,id)=>{
		debugger;
		if(window.confirm('Are you aure you want to delete?'))

		complaintHelper.deleteComplaint(id)
		.then(success=>{
			if(success==="OK")
			{
				setSuccess('success');
				return alert('Record deleted successfully!')
			}
			else
			{
				alert('An error occured while trying to delete this record')
			}
		}).catch(err=>{
			alert('An error occured while performing the delete operation')
		})
	}


	return (
		<React.Fragment>
			<Header user={props.location.state.props.user} role={props.location.state.props.role} />
			<h3 style={{ float: 'left' }}>Manage Patient Complaints</h3>
			<br/>
			<br/>
			<br/>
			{
				<center><div className="alert alert-info" style={{visibility:complaintList.length<1?"visible":"hidden"}}>
					Dear {props.location.state.props.user.name}, There are {complaintList
					.length} pending complaint(s) for today.
				</div></center>
			}
			
			<table
				className="table"
				style={{ visibility: complaintList.length > 0 ? 'visible' : 'hidden', width: '100%' }}
			>
				<thead className="thead-dark">
					<tr>
						<th>S/N</th>
						<th>full Name</th>
						<th>Address</th>
						<th>Email Address</th>
						<th>Mobile Number</th>
						<th>Date Visited</th>

						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{complaintList.length > 0 ? (
						complaintList.map((users, index) => {
							return (
								<tr key={users.id}>
									<td key={index}>{index + 1}</td>
									<td key={users.patient.name}>{users.patient.name}</td>
									<td key={users.patient.address}>{users.patient.address}</td>
									<td key={users.patient.email}>{users.patient.email}</td>
									<td key={users.patient.mobilenumber}>{users.patient.mobilenumber}</td>
									<td key={users.datevisited}>{users.datevisited}</td>
									<td key="delete">
										<Popup
											trigger={<button className="btn btn-primary"> View Details </button>}
											modal
											closeOnDocumentClick
										>
											{!users.istesttaken?<ComplaintDetails userdata={users} diseases={conditionList} loggedinuser={props} />
											:<ComplaintDetailsResult userdata={users} diseases={conditionList} loggedinuser={props} />}
										</Popup>|<button className="btn btn-danger" onClick={()=>Delete(this,users.id)}>Delete</button>
									</td>
								</tr>
							);
						})
					) : (
						complaintList
					)}
				</tbody>
			</table>
		</React.Fragment>
	);
}
