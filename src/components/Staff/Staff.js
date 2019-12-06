import React, { useState, useRef, useEffect } from 'react';
import Header from '../Header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import StaffList from './StaffList';
const department =require('../../Services/department.service');
const role=require('../../Services/role.service');
const staff=require('../../Services/staff.service');
export default function Staff(props) {
	let fullname = useFormDetails('');
	const username = useFormDetails('');
	const address = useFormDetails('');
	const mobilenumber = useFormDetails('');
	const email = useFormDetails('');
	const specialtyid = useFormDetails(0);
	const stafftypeid = useFormDetails(0);
	const departmentid = useFormDetails(0);
	const roleid = useFormDetails(0);
	const staffid = useFormDetails(0);
	const [ departmentList, setDepartmentList ] = useState([]);
	const [ roleList, setRoleList ] = useState([]);
	const [ staffTypeList, setStaffTypeList ] = useState([]);
	const [ specialty, setSpecialtyList ] = useState([]);
	const [ userList, setUserList ] = useState([]);
	const InputFocus = useRef(null);
	const [ successMessage, setIsSuccess ] = useState('');

	useEffect(() => {
		document.title = 'Manage Staff';
	});
	useEffect(() => {
		InputFocus.current.focus();
		const fetchDepartment = async () => {
			await department.getDepartments()
				.then((success) => {
					setDepartmentList(success);
				})
				.catch((err) => {});
		};
		fetchDepartment();
	}, []);

	useEffect(() => {
		const fetchRole = async () => {
			await role.getAllRoles()
				.then((success) => {
					setRoleList(success);
				})
				.catch((err) => {});
		};
		fetchRole();
	}, []);

	useEffect(() => {
		const fetchStaffType = async () => {
			await staff.getStaffType()
				.then((success) => {
					setStaffTypeList(success);
				})
				.catch((err) => {});
		};
		fetchStaffType();
	}, []);

	useEffect(() => {
		const fetchSpecialty = async () => {
			await staff.getStaffSpecialty()
				.then((success) => {
					setSpecialtyList(success);
				})
				.catch((err) => {});
		};
		fetchSpecialty();
	}, []);

	useEffect(
		() => {
			const fetchUserList = async () => {
				await staff.getAllStaff()
					.then((success) => {
						setUserList(success);
					})
					.catch((err) => {});
			};
			fetchUserList();
		},
		[ successMessage ]
	);
	const Edit = (e, id, obj) => {
		fullname.setValue(fullname, obj.name);
		email.setValue(email, obj.email);
		username.setValue(username, obj.username);
		mobilenumber.setValue(mobilenumber, obj.mobilenumber);
		address.setValue(address, obj.address);
		departmentid.setValue(departmentid, obj.departmentid);
		specialtyid.setValue(specialtyid, obj.specialtyid);
		stafftypeid.setValue(stafftypeid, obj.stafftypeid);
		roleid.setValue(roleid, obj.roleid);
		staffid.setValue(staffid, obj.id);
	};
	const Submit = () => {
		if (fullname.value === '') {
			return alert('Enter staff Name');
		}
		if (email.value === '') {
			return alert('Enter Email');
		}
		if (mobilenumber.value === '') {
			return alert('Enter Mobile Number');
		}
		if (address.value === '') {
			return alert('Enter Addres');
		}
		if (username.value === '') {
			return alert('Enter Username');
		}
		if (stafftypeid.value === '') {
			return alert('Select Staff Type');
		}
		if (specialtyid.value === '') {
			return alert('Select Specialty');
		}
		if (departmentid.value === '') {
			return alert('Select Department');
		}
		if (roleid.value === '') {
			return alert('Select Role');
		}

		var staffPostBody = {
			username: username.value,
			mobilenumber: mobilenumber.value,
			email: email.value,
			address: address.value,
			password: 'user1',
			specialtyid: specialtyid.value,
			stafftypeid: stafftypeid.value,
			departmentid: departmentid.value,
			name: fullname.value,
			datecreated:
				new Date().getFullYear() +
				'-' +
				(parseInt(new Date().getMonth().toString()) + 1) +
				'-' +
				new Date().getDate(),
			roleid: roleid.value
		};
		//post to api
		if (staffid.value < 1) {
			staff.addStaff(staffPostBody)
				.then((success) => {
					if (success === 'OK') {
						alert('User created Successfully');
						ClearField();
						setIsSuccess('success');
						return;
					} else {
						alert('Username already taken by another staff');
					}
				})
				.catch((err) => {
					alert('An error occured while performing your request');
				});
		} else {
			staff.updateStaff(staffid.value,staffPostBody)
				.then((success) => {
					if (success === 'OK') {
						alert('User Updated Successfully');
						Cancel();
						setIsSuccess('success');
						return;
					} else {
						alert('An error occured while performing your request');
					}
				})
				.catch((err) => {
					alert('An error occured while performing your request');
				});
		}
	};
	
	const Delete = (e, index) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			debugger;
			staff.deleteStaff(index)
				.then((success) => {
					alert('user deleted successfully!');
					setIsSuccess('success');
				})
				.catch((err) => {
					alert('An error occured while processing your request');
				});
		}
	};
	const ClearField = () => {
		username.value = '';
		mobilenumber.value = '';
		email.value = '';
		address.value = '';
		specialtyid.value = '';
		stafftypeid.value = '';
		departmentid.value = '';
		fullname.value = '';
		roleid.value = '';
		staffid.value = 0;
	};
	const Cancel = () => {
		fullname.setValue(fullname, '');
		email.setValue(email, '');
		username.setValue(username, '');
		mobilenumber.setValue(mobilenumber, '');
		address.setValue(address, '');
		departmentid.setValue(departmentid, '');
		specialtyid.setValue(specialtyid, '');
		stafftypeid.setValue(stafftypeid, '');
		roleid.setValue(roleid, '');
		staffid.setValue(staffid, '');
	};
	if (props.location.state.props.role !== undefined && !props.location.state.props.role.includes('All', 'User'))
		return <Redirect to="/unauthorized" />;

	return (
		<div>
			<Header user={props.location.state.props.user} role={props.location.state.props.role} />
			<h3 style={{ float: 'left' }}>Manage Staff/users</h3>
			<div className="row">
				<div className="col-lg-4">
					<br />
					<span className="logintextheader">Full Name</span>&nbsp;
					<input
						type="text"
						ref={InputFocus}
						value={fullname.value}
						onChange={fullname.onChange}
						className="form-control LoginInputTextSize"
					/>
					<span className="logintextheader">Email</span>&nbsp;
					<input
						type="email"
						value={email.value}
						onChange={email.onChange}
						className="form-control LoginInputTextSize"
					/>
					<span className="logintextheader">Mobile Number</span>&nbsp;
					<input
						type="phone"
						value={mobilenumber.value}
						onChange={mobilenumber.onChange}
						className="form-control LoginInputTextSize"
					/>
					<span className="logintextheader">Address</span>&nbsp;
					<textarea
						value={address.value}
						placeholder="Enter Address"
						className="form-control LoginInputTextSize"
						onChange={address.onChange}
					/>
					<span className="logintextheader">Username</span>&nbsp;
					<input
						type="text"
						value={username.value}
						onChange={username.onChange}
						readOnly={staffid.value > 0}
						className="form-control LoginInputTextSize"
					/>
				</div>
				<div className="col-lg-4">
					<br />
					<span className="logintextheader">Staff Type</span>&nbsp;
					<select
						value={stafftypeid.value}
						onChange={stafftypeid.onChange}
						className="form-control LoginInputTextSize"
					>
						<option>--Select</option>
						{staffTypeList.length > 0 ? (
							staffTypeList.map((x) => {
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
					<span className="logintextheader">Specialty</span>&nbsp;
					<select
						value={specialtyid.value}
						onChange={specialtyid.onChange}
						className="form-control LoginInputTextSize"
					>
						<option>--Select</option>
						{specialty.length > 0 ? (
							specialty.map((x) => {
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
					<span className="logintextheader">Department</span>&nbsp;
					<select
						value={departmentid.value}
						onChange={departmentid.onChange}
						className="form-control LoginInputTextSize"
					>
						<option>--Select</option>
						{departmentList.length > 0 ? (
							departmentList.map((x) => {
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
					<span className="logintextheader">Role Id</span>&nbsp;
					<select value={roleid.value} onChange={roleid.onChange} className="form-control LoginInputTextSize">
						<option>--Select</option>
						{roleList.length > 0 ? (
							roleList.map((x) => {
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
					<br />
					<button className="btn btn-success" onClick={Submit}>
						{staffid.value > 0 ? 'Update' : 'Save'}
					</button>&nbsp;&nbsp;
					<button
						className="btn btn-danger"
						onClick={() => Cancel()}
						style={{ visibility: staffid.value > 0 ? 'visible' : 'hidden' }}
					>
						Cancel
					</button>
				</div>
			</div>

			<StaffList userlist={userList} Delete={Delete} Edit={Edit} />
		</div>
	);
}

function useFormDetails(initialInput) {
	const [ value, setValue ] = useState(initialInput);

	function handleChange(e) {
		setValue(e.target.value);
	}

	function setState(e, val) {
		setValue(val);
	}

	return {
		value,
		onChange: handleChange,
		setValue: setState
	};
}
