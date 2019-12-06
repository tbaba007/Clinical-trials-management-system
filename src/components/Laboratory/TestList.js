import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import Header from '../Header/header';
import TestDetails from './Testdetails';
const PendingTest=require('../../Services/laboratory.service');
export default function TestList(props) {
	const [ pendingTestList, setpendingTestList ] = useState([]);
	useEffect(() => {
		const fetchPendingTests = async () => {
			await PendingTest.getPendingTestToday(	new Date().getFullYear() +
			'-' +
			(parseInt(new Date().getMonth().toString()) + 1) +
			'-' +
			new Date().getDate())
				.then((success) => {
					setpendingTestList(success);
				})
				.catch((err) => {
					alert('An error occured while fetching complaints for today');
				});
		};
		fetchPendingTests();
	}, []);

	return (
		<React.Fragment>
			<Header user={props.location.state.props.user} role={props.location.state.props.role} />
			<h3 style={{ float: 'left' }}>Manage Pending Test(s)</h3>
			<br />
			<br />
			<br />
			{
				<center>
					<div
						className="alert alert-info"
						style={{ visibility: pendingTestList.length < 1 ? 'visible' : 'hidden' }}
					>
						Dear {props.location.state.props.user.name}, There are {pendingTestList.length} pending Test(s)
						for today.
					</div>
				</center>
			}

			<table
				className="table"
				style={{ visibility: pendingTestList.length > 0 ? 'visible' : 'hidden', width: '100%' }}
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
					{pendingTestList.length > 0 ? (
						pendingTestList.map((users, index) => {
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
											<TestDetails userdata={users} loggedinuser={props} />
										</Popup>
									</td>
								</tr>
							);
						})
					) : (
						pendingTestList
					)}
				</tbody>
			</table>
		</React.Fragment>
	);
}
