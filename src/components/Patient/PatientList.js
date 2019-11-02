import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import SchedulePatient from './SchedulePatient';
export default function _PatientList(props) {
	
	return (
		<React.Fragment>
			<center style={{ visibility: props._PatientList.length > 0 ? 'visible' : 'hidden', width: '100%' }}>
				{/* <div style={{ float: 'left', marginLeft: '30%' }}>
					<label>Search</label>
				</div>

				<input
					type="text"
					className="form-control"
					style={{ width: '30%', marginRight: '32%', alignSelf: 'center' }}
					placeholder="Enter Name or Mobile Number"
				/>
				<br /> */}
			</center>
			<table
				className="table"
				style={{ visibility: props._PatientList.length > 0 ? 'visible' : 'hidden', width: '100%' }}
			>
				<thead className="thead-dark">
					<tr>
						<th>S/N</th>
						<th>full Name</th>
						<th>Address</th>
						<th>Email Address</th>
						<th>Mobile Number</th>
						<th>Created Date</th>
						<th>Created By</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{props._PatientList !== undefined && props._PatientList.length > 0 ? (
						props._PatientList.map((users, index) => {
							return (
								<tr key="0">
									<td key={index}>{index + 1}</td>
									<td key={users.name}>{users.name}</td>
									<td key={users.address}>{users.address}</td>
									<td key={users.email}>{users.email}</td>
									<td key={users.mobilenumber}>{users.mobilenumber}</td>
									<td key={users.dateregistered}>{users.dateregistered}</td>
									<td key={users.user.username}>{users.user.username}</td>
									<td key="delete">
										<button
											className="btn btn-danger"
											onClick={() => props.Delete(this, users.id, index)}
										>
											Delete
										</button>|{' '}
										<Popup
											trigger={<button className="btn btn-primary"> Schedule </button>}
											modal
											closeOnDocumentClick
										>
											<SchedulePatient userdata={users} doctorList={props.DoctorList} closeOnDocumentClick/>
										</Popup>
									</td>
								</tr>
							);
						})
					) : (
						props._PatientList
					)}
				</tbody>
			</table>
		</React.Fragment>
	);
}
