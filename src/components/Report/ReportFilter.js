import React, { useState, useEffect } from 'react';
import { Api } from '../../Helper/Api';
import Header from '../Header/header';
import ReportList from '../Report/ReportList';

export default function ReportFilter(props) {
	const fromdate = useFormDetails('');
	const todate = useFormDetails('');
	const [ analysisList, setAnalysis ] = useState([]);
	const [ diseaseList, setDiseaList ] = useState([]);
	const [ diseaseid, setDiseaseid ] = useState(0);

	useEffect(() => {
		fetch(Api + 'condition/getall')
			.then((response) => response.json())
			.then((success) => setDiseaList(success))
			.catch((err) => {});
	}, [setDiseaList]);


	const handleChange = (e) => {
		setDiseaseid(e.target.value);
		
	};

	

	const handleDelete=(e,id,index)=>{
		if(window.confirm('Are you sure you want to delete this record?'))
		fetch(Api+"medicalhistory/deleteinfo/"+id,{
			method:'DELETE',
			headers:{
				'Content-type':'application/json'
			}
		}).then(response=>response.text())
		.then(success=>{
			if(success==="OK")
			{
				//analysisList.splice(index,1,analysisList);
				alert('Record deleted Successfully!');
				filter();
			}
			else{
				alert('An error occured while performing your requests!')
			}
		}).catch(err=>{
			alert('An error occured while performing your requests')
		})
	}

	const filter = () => {
		debugger;
		if (fromdate.value === '') {
			return alert('Please Select A Start Date');
		}
		if (todate.value === '') {
			return alert('Please Select A End Date');
		}
		const date1 = new Date(fromdate.value);
		const date2 = new Date(todate.value);

		if (date1 > date2) {
			alert('Start date cannot be greater than End date');
			return;
		}

		var analysisValues = {
			fromdate: fromdate.value,
			enddate: todate.value
		};

		if (diseaseid > 0) {
			fetch(Api + 'medicalhistory/analysis/' + diseaseid, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(analysisValues)
			})
				.then((response) => response.json())
				.then((success) => {
					setAnalysis(success);
				})
				.catch((err) => alert('An error occured while performing your request'));
		} else {
			fetch(Api + 'medicalhistory/analysis', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(analysisValues)
			})
				.then((res) => res.json())
				.then((success) => {
					setAnalysis(success);
				})
				.catch((err) => {
					alert('An error occured while performing your requests!');
				});
		}
	};
	return (
		<div>
			<Header user={props.location.state.props.user} role={props.location.state.props.role} />
			<h3 style={{ float: 'left' }}>Clinical Analysis</h3>
			<br />
			<br />
			<center>
				<table>
					<thead>
						<tr>
							<th>
								Start Date<input
									type="date"
									value={fromdate.value}
									onChange={fromdate.onChange}
									className="form-control"
								/>
							</th>
							<th />
							<th style={{ marginLeft: '130px' }}>
								End Date<input
									type="date"
									value={todate.value}
									onChange={todate.onChange}
									className="form-control"
								/>
							</th>
							<th />
							<th style={{ marginLeft: '130px' }}>
								<br />
								<button className="btn btn-success" onClick={filter}>
									Search
								</button>
							</th>
							<th />

							<th />

							<td />
						</tr>
					</thead>
				</table>
				<br />
				Filter By Disease
				<select
					className="form-control"
					style={{ width: '25%', marginLeft: '10px' }}
					value={diseaseid}
					onChange={handleChange}
				>
					<option>-- Select--</option>
					{diseaseList.length > 0 ? (
						diseaseList.map((x) => {
							return (
								<option value={x.id} key={x.name + x.id}>
									{x.name}
								</option>
							);
						})
					) : (
						0
					)}
				</select>
			</center>
			<br />
			<ReportList Report={analysisList} handleDelete={handleDelete} />
		</div>
	);
}

function useFormDetails(initialInput) {
	const [ value, setValue ] = useState(initialInput);

	function handleOnchange(e) {
		setValue(e.target.value);
	}

	return {
		value,
		onChange: handleOnchange
	};
}
