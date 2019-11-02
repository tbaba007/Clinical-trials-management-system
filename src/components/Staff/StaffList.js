import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function StaffList(props) {
	return (
		<React.Fragment>
           <br/>
			<center style={{ visibility: props.userlist!==undefined && props.userlist.length > 0 ? 'visible' : 'hidden', width: '100%' }}>
				<div style={{float:"left",marginLeft:'30%'}}>
					<label>Search</label>
				</div>
			
					<input
						type="text"
						className="form-control"
						style={{ width: '30%',marginRight:'32%', alignSelf: 'center' }}
						placeholder="Enter Name or Mobile Number"
					/>
                    <br/>
                    
				
			</center>
			<table
				className="table"
				style={{ visibility: props.userlist!==undefined && props.userlist.length > 0 ? 'visible' : 'hidden', width: '100%' }}
			>
				<thead className="thead-dark">
					<tr>
						<th>S/N</th>
						<th>full Name</th>
						<th>Address</th>
						<th>Email Address</th>
						<th>Mobile Number</th>
						<th>Created Date</th>
						<th>Role</th>
                        <th>Department</th>
                        <th>Type</th>
                        <th>Specialty</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>

				<tbody>
					{props.userlist !== undefined && props.userlist.length > 0 ? (
						props.userlist.map((users, index) => {
							return (
								<tr key={index+1}>
									<td key={index}>{index + 1}</td>
									<td key={users.name}>{users.name}</td>
									<td key={users.address}>{users.address}</td>
									<td key={users.email}>{users.email}</td>
									<td key={users.mobilenumber}>{users.mobilenumber}</td>
									<td key={users.datecreated}>{users.datecreated}</td>
									<td key={users.role.name}>{users.role.name}</td>
									<td key={users.department.name}>{users.department.name}</td>
									<td key={users.stafftype.name}>{users.stafftype.name}</td>
									<td key={users.specialty.name}>{users.specialty.name}</td>
                                    <td key="edit">
										<button
											className="btn btn-primary"
											onClick={() => props.Edit(this, users.id, users)}
										>
											Edit
										</button>
									</td>
									<td key="delete">
										<button
											className="btn btn-danger"
											onClick={() => props.Delete(this, users.id, index)}
										>
											Delete
										</button>
									</td>

                                    
								</tr>
							);
						})
					) : (
						props.userlist
					)}
				</tbody>
			</table>
		</React.Fragment>
	);
}
