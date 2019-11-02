import React, { useState, useRef, useEffect } from 'react';
import Header from '../Header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
import { Api } from '../../Helper/Api';
import DepartmentList from './DepartmentList';
export default function ManageDisease(props) {
	const [ departmentName, setDepartmentName ] = useState('');
	const [ departmentList, setDepartmentList ] = useState([]);
	const [ departmentid, setDepartmentId ] = useState(0);
	const [ success, setSuccess ] = useState('');

	const InputFocus = useRef(null);
	useEffect(() => {
		document.title = 'Manage Department';
		InputFocus.current.focus();
	});

	useEffect(
		() => {
			const fetchDepartment = async () => {
				await fetch(Api + 'department/getall')
					.then((res) => res.json())
					.then((success) => {
						setDepartmentList(success);
					})
					.catch((err) => {
						alert('An error occured while fetching the department list');
					});
			};
			fetchDepartment();
		},
		[ success ]
	);

	const handleOnchange = (e) => {
		setDepartmentName(e.target.value);
	};
	const handleEdit = (e, model) => {
		setDepartmentName(model.name);
		setDepartmentId(model.id);
	};
	const handleCancel = (e) => {
		setDepartmentId(0);
		setDepartmentName('');
	};
	const handleClear = () => {
		setDepartmentName('');
		setDepartmentId(0);
	};

	const handleDelete = (e, id) => {
		debugger;
		if (window.confirm('Are you sure you want to delete this department?'))
			fetch(Api + 'department/delete/' + id, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				}
			})
				.then((response) => response.text())
				.then((success) => {
					if (success === 'OK') {
						alert('Department deleted successfully!');
						setSuccess('success');
						handleClear();
						return;
					} else {
						alert(
							'An error occured while performing your request because this department ' +
								'is mapped to employees. if you wish to delete this department, kindly delete the employees attached to it or update their department(s).'
						);
					}
				})
				.catch((err) => {
					alert('Cannot delete the department because it is mapped to employees');
				});
	};
	const handleSave = (e) => {
		if (departmentName === '') {
			return alert('Enter department name');
		}

		var departmentData = {
			name: departmentName,
			createdby: props.location.state.props.user.id
		};

		if (departmentid > 0) {
			fetch(Api + 'department/update/' + departmentid, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(departmentData)
			})
				.then((response) => response.text())
				.then((success) => {
					if (success === 'OK') {
						alert('department has been updated successfully!');
						setSuccess('updated');
						handleClear();
						return;
					}
				})
				.catch((err) => {
					alert('An error occured while performing your request!');
				});
		} else {
			fetch(Api + 'department/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(departmentData)
			})
				.then((response) => response.text())
				.then((success) => {
					if (success === 'OK') {
						alert('Department added successfully!');
						setSuccess('updated');
						setDepartmentName('');
						return;
					} else alert('Department already exists');
				});
		}
	};
	return (
		<div>
			<Header user={props.location.state.props.user} role={props.location.state.props.role} />
			<h3 style={{ float: 'left' }}>Manage Department(s).</h3>

			<center>
				<div className="col-lg-4">
					<br />
					<span className="logintextheader">Department Name</span>&nbsp;
					<br />
					<input
						type="text"
						ref={InputFocus}
						value={departmentName}
						onChange={handleOnchange}
						style={{ float: 'left' }}
						className="form-control LoginInputTextSize"
					/>
					<br />
					<br />
					<button className="btn btn-success" onClick={() => handleSave()}>
						{departmentid > 0 ? 'Update' : 'Save'}
					</button>{' '}
					&nbsp;&nbsp;&nbsp;
					<button
						className="btn btn-danger"
						style={{ visibility: departmentid > 0 ? 'visible' : 'hidden' }}
						onClick={() => handleCancel()}
					>
						Cancel
					</button>
				</div>
			</center>

			<br />
			<br />
			<DepartmentList Diseases={departmentList} Edit={handleEdit} Delete={handleDelete} />
		</div>
	);
}
