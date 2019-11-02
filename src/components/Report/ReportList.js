import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import ReportDetails from './ReportDetails';
export default function ReportList(props) {
	debugger;
	
	return (
		<React.Fragment>
			
			<table
				className="table"
				style={{ visibility: props.Report!==undefined && props.Report.length > 0 ? 'visible' : 'hidden', width: '100%' }}
			>
				<thead className="thead-dark" style={{width:'100%'}}>
					<tr>
						<th>S/N</th>
						<th>full Name</th>
						<th>Address</th>
						<th>Email Address</th>
						<th>Mobile Number</th>
						<th>Date Visited</th>
                        <th>Disease</th>
						<th>View</th>
						<th>Delete</th>
					</tr>
				</thead>

				<tbody>
					{props.Report!==undefined && props.Report.length > 0 ? (
						props.Report.map((users, index) => {
							return (
								<tr key={users.id}>
									<td key={index}>{index + 1}</td>
									<td key={users.patient.name}>{users.patient.name}</td>
									<td key={users.patient.address}>{users.patient.address}</td>
									<td key={users.patient.email}>{users.patient.email}</td>
									<td key={users.patient.mobilenumber}>{users.patient.mobilenumber}</td>
									<td key={users.datevisited}>{users.datevisited}</td>									
									<td key={users.condition===null?"NIL":users.condition.name}>{users.condition===null?
										"NIL":users.condition.name}</td>
									<td key="view">
										<Popup
											trigger={<button className="btn btn-primary"> View Details </button>}
											modal
											closeOnDocumentClick
										>
											<ReportDetails medicalDetails={users}/>
										</Popup>
									</td>
									<td key="delete">
										<button className="btn btn-danger" onClick={()=>props.handleDelete(this,users.id)}>Delete</button>
									</td>
								</tr>
							);
						})
					) : (
						0
					)}
				</tbody>
			</table>
		</React.Fragment>
	);
}
