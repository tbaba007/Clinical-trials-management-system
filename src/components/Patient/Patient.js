import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientList from './PatientList';
import {Redirect} from 'react-router-dom';
const patientService=require('../../Services/patient.service');
export default function Patient(props) {
	
	const fullname = useFormDetails('');
	const address = useFormDetails('');
	const email = useFormDetails('');
	const mobilenumber = useFormDetails('');
	const [patientList,setPatientList]=useState([]);
	const [deleted,setIsDeleted]=useState(false);
	const [success,setIsSuccess]=useState('');
	const [doctors,setDoctors]=useState([]);
    useEffect(()=>{
		document.title="Manage Patients"
		
	})
	
	useEffect(()=>{
		const fetchPatients=async ()=>{
		await patientService.fetchPatients()
			
			.then(success=>{
				setPatientList(success);
			}).catch(err=>{

			})
		};
		fetchPatients();
	},[deleted,success])

	useEffect(()=>{
		const fetchDoctors=async()=>{
			await patientService.fetchDoctors()
			.then(success=>{
				setDoctors(success)
			}).catch(err=>{

			})
		};
		fetchDoctors();
	},[])
	
	function clearfields()
	{
		fullname.setValue(fullname,'');
		email.setValue(email,'');
		mobilenumber.setValue(mobilenumber,'');
		address.setValue(address,'');
	}
	
	function Delete(e,index)
	{
		if(window.confirm('Are you sure you want to delete this patient?'))
		patientService.deletePatient(index)
			.then(success=>{
			if(success){
				alert('Patient deleted Successfully!')
				setIsDeleted(true);
			}
		}).catch(err=>{
			alert('An error occured while performing your request!')
		})
		else
		return false;
	}

    function Submit(e){
        if(fullname.value==='')
        {
            return alert('Enter Patient Name');
        }
        if(email.value==='')
        {
            return alert('Enter Email')
        }
        if(mobilenumber.value==='')
        {
            return alert('Enter Mobile Number')
        }
        if(address.value==='')
        {
            return alert('Enter Addres')
        }

        //Call Api and save
        var patientModel={
            "name":fullname.value,
            "email":email.value,
            "mobilenumber":mobilenumber.value,
            "address":address.value,
            "dateregistered":new Date().getFullYear()+"-"+(parseInt(new Date().getMonth().toString())+1)+"-"+new Date().getDate(),
            "createdby":props.location.state.props.user.id
        };
		patientService.addPatient(patientModel)
        .then(success=>{
            if(success==="OK")
            {
				 alert('Patient Added Successfully!');
				 clearfields();
				 setIsSuccess('true');
				return
			}
			else
			return alert('Patient Already Exists');
        }).catch(err=>{
		
            alert('An error occured while processing your request');
        })
	}
	
	// if(props.location.state.props.role!==undefined && !props.location.state.props.role.includes('All')|props.location.state.props.role.includes('Patients'))
	// return <Redirect to="/unauthorized"/>
	return (
		
		<div>
			<Header user={props.location.state.props.user} role={props.location.state.props.role} />
			<h3 style={{ float: 'left' }}>Manage Patient</h3>
			<div className="row">
				<div className="col-lg-4">
					<br />
					<span className="logintextheader">Full Name</span>&nbsp;
					<input
						type="text"
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
				</div>
				<div className="col-lg-4">
					<br />
					<span className="logintextheader">Address</span>&nbsp;
					<textarea
						value={address.value}
						placeholder="Enter Address"
						className="form-control"
						onChange={address.onChange}
					/>
                    <br/>
                    <button className="btn btn-success" onClick={Submit}>Save</button>
				</div>
			</div>
			<br/>
			<PatientList _PatientList={patientList} Delete={Delete} DoctorList={doctors}/>
			<br/>
		
		</div>
	);
}

function useFormDetails(initialInput) {
	const [ value, setValue ] = useState(initialInput);

	function handleChange(e) {
		setValue(e.target.value);
	}
	function setState(e, val) {
		debugger;
		setValue(val);
	}

	return {
		value,
		onChange: handleChange,
		setValue: setState
	};
}
