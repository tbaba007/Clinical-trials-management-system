import React, { useState, useRef, useEffect } from 'react';
import Header from '../Header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
import DiseaseList from './DiseaseList';
const disease=require('../../Services/disease.service');
export default function ManageDisease(props) {
	const [ diseaseName, setDiseaseName ] = useState('');
    const [ diseaseList, setDiseaseList ] = useState([]);
    const [diseaseid,setDiseaseid]=useState(0);
    const [ success, setSuccess ] = useState(0);
    
	const InputFocus = useRef(null);
	useEffect(() => {
		document.title = 'Manage Diseases';
		InputFocus.current.focus();
	});

	useEffect(
		() => {
			const fetchDiseases = async () => {
				await disease.fetchDisease()
					.then((success) => {
						setDiseaseList(success);
					})
					.catch((err) => {
						alert('An error occured while fetching the disease list');
					});
			};
			fetchDiseases();
		},
		[ success ]
	);

	const handleOnchange = (e) => {
		setDiseaseName(e.target.value);
	};
	const handleEdit = (e,model) => {
        
        setDiseaseName(model.name);
        setDiseaseid(model.id);
    };
    const handleCancel=e=>{
        setDiseaseid(0);
        setDiseaseName('')
    }
    const handleClear=()=>{
        setDiseaseName('');
        setDiseaseid(0);
    };
    const handleSearch=(e,index)=>{
        disease.getDiseaseByName(e)
     .then(success=>{
         setDiseaseList(success)
     })
    }
	const handleDelete = (e,id) => {
        if(window.confirm('Are you sure you want to delete this disease?'))
        disease.deleteDisease(id)
        .then(success=>{
            if(success==="OK")
            {
                alert('Disease deleted successfully!');
                setSuccess(id);
                handleClear();
                return;
            }
            else{
                alert('An error occured while performing your request!')
            }
        }).catch(err=>{
            alert('An error occured while performing your request')
        })
    };
	const handleSave = (e) => {
        if(diseaseName==='')
        {
            return alert('Enter disease name')
        }

        var diseaseData={
            name:diseaseName
        };

        if(diseaseid>0)
        {
            disease.updateDisease(diseaseid)
              .then(success=>{
                  if(success==="OK")
                 {
                     alert('Disease has been updated successfully!')
                     setSuccess(diseaseid)
                     handleClear();
                     return;
                 }
                 
              }).catch(err=>{
                  alert('An error occured while performing your request!')
              })
        }
        else
        {
            disease.addDisease(diseaseData)
              .then(success=>{
                  if(success==="OK")
                 {
                     alert('Disease added successfully!')
                     setSuccess(1)
                     return;
                 }
                 
                 else
                 alert('Disease already exists');
              })
        }
    };
	return (
		<div>
			<Header user={props.location.state.props.user} role={props.location.state.props.role} />
			<h3 style={{ float: 'left' }}>Manage Disease(s).</h3>

			<center>
				<div className="col-lg-4">
					<br />
					<span className="logintextheader">Disease Name</span>&nbsp;
					<br />
					<input
						type="text"
						ref={InputFocus}
						value={diseaseName}
						onChange={handleOnchange}
						style={{ float: 'left' }}
						className="form-control LoginInputTextSize"
					/>
					<br />
					<br />
					<button className="btn btn-success" onClick={()=>handleSave()}>{diseaseid>0?"Update":"Save"}</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-danger"style={{visibility:diseaseid>0?"visible":"hidden"}} onClick={()=>handleCancel()}>Cancel</button>
				</div>
			</center>

			<br />
            <br/>
            <DiseaseList Diseases={diseaseList} Edit={handleEdit} Delete={handleDelete} Search={handleSearch}/>
		</div>
	);
}
