import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export function Header(props) {

	if(props.role===undefined)
	{
		return <Redirect to="/Login"/>
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="navbar-brand">Clinical Management System</div>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li
						className="nav-item"
						style={{ visibility: props.role.includes('All')|props.role.includes('Patients') ? 'visible' : 'hidden',
					display:!props.role.includes('All')|!props.role.includes('Patients')?"none":"" }}
					>
						<Link to={{ pathname: '/ManagePatient', state: { props } }} className="nav-link">
							Manage patients
						</Link>
					</li>

					<li
						className="nav-item"
						style={{ visibility: props.role.includes('All') ? 'visible' : 'hidden',
						display:!props.role.includes('All')?"none":"" }}
					>
						<Link to={{ pathname: '/managestaff', state: { props } }} className="nav-link">
							Manage Staff
						</Link>
					</li>
					<li
						className="nav-item"
						style={{ visibility: props.role.includes('All') ? 'visible' : 'hidden',
						display:!props.role.includes('All')?"none":"" }}
					>
						<Link to={{ pathname: '/managedepartment', state: { props } }} className="nav-link">
							Manage Departments
						</Link>
					</li>

					<li
						className="nav-item"
						style={{ visibility: props.role.includes('All') ? 'visible' : 'hidden',
						display:!props.role.includes('All')?"none":"" }}
					>
						<Link to={{ pathname: '/managedisease', state: { props } }} className="nav-link">
							Manage Diseases
						</Link>
					</li>


					<li
						className="nav-item"
						style={{ visibility: props.role.includes('All')|props.role.includes('Complaints') ? 'visible' : 'hidden',
					display:!props.role.includes('All')|!props.role.includes('Complaints')?"none":"" }}
					>
						<Link to={{ pathname: '/managecomplaints', state: { props } }} className="nav-link">
							 Complaints
						</Link>
					</li>
					<li
						className="nav-item"
						style={{ visibility: props.role.includes('All') ? 'visible' : 'hidden' }}
					>
						<Link to={{ pathname: '/managetests', state: { props } }} className="nav-link">
							 Tests
						</Link>
					</li>
					<li
						className="nav-item"
						style={{ visibility: props.role.includes('All')|props.role.includes('Test') ? 'visible' : 'hidden',
						display:!props.role.includes('All')|!props.role.includes('Test')?"none":"" }}
					>
						<Link to={{ pathname: '/managereports', state: { props } }} className="nav-link">
							View Reports
						</Link>
					</li>
				</ul>

				<p>
					Welcome: {props.user.username}{' '}
					<Link to="/Login" className="btn btn-success">
						Sign-Out
					</Link>{' '}
				</p>
			</div>
		</nav>
	);
}

export default Header;
