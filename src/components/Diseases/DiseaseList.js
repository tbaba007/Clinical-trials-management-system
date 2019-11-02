import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Diseases(props) {
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ diseasePerPage, setDiseasePerPage ] = useState(50);
    const pageNumbers = [];

	const handleClick = (e) => {
       
		setCurrentPage(Number(e.target.id));
    };
    const handleDisesesPerPage=(e)=>{
        setDiseasePerPage(e.target.value);
    }

	for (let i = 1; i <= Math.ceil(props.Diseases === undefined ? 0 : props.Diseases.length / diseasePerPage); i++) {
		pageNumbers.push(i);
    }
	const indexOfLastDisease = currentPage * diseasePerPage;
	var indexOfFirstDisease = indexOfLastDisease - diseasePerPage;
	const currentDisease = props.Diseases.slice(indexOfFirstDisease, indexOfLastDisease);

	const renderPageNumbers = pageNumbers.map((number) => {
		return (
			<ul className="pagination" style={{ display: 'inline-block', alignItems: 'center' }}>
				<li
					className="page-link"
					style={{ listStyleType: 'none' }}
					key={number}
					id={number}
					onClick={handleClick}
				>
					{number}
				</li>
			</ul>
		);
    });
   
	return (
      
		<React.Fragment>
			<br />

			<center
				style={{
					visibility: props.Diseases !== undefined && props.Diseases.length > 0 ? 'visible' : 'hidden',
					width: '100%'
				}}
			>
			

				{/* <input
					type="text"
					className="form-control"
					style={{ width: '30%', marginRight: '32%', alignSelf: 'center' }}
					placeholder="Enter disease name" onChange={handleSearchParam}
				/> */}

					<label style={{ float: 'left'}}>Sort Disease Per Page </label>&nbsp;&nbsp;&nbsp;
                    <select className="form-control" style={{ width: '10%', float:'left',marginLeft:'30px', alignSelf: 'center' }} value={diseasePerPage} onChange={handleDisesesPerPage}>
                        <option key="50" value="50">50</option>
                        <option key="100" value="100">100</option>
                        <option key="500" value="500">500</option>
                    </select>

                    <label style={{ float: 'right',marginRight:'50px',fontWeight:"bold"}}>Total Registered Diseases.{props.Diseases.length} </label>&nbsp;&nbsp;&nbsp;

                    <br/>
                
				<br />
			</center>
			<div />
			<table
				className="table"
				style={{
					visibility: props.Diseases !== undefined && props.Diseases.length > 0 ? 'visible' : 'hidden',
					width: '100%'
				}}
			>
				<thead className="thead-dark">
					<tr>
						<th>S/N</th>
						<th>Name</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>

				<tbody>
					{currentDisease !== undefined && currentDisease.length > 0 ? (
						currentDisease.map((users, index) => {
							return (
								<tr key={index + 1}>
									<td key={index}>{index + 1}</td>
									<td key={users.name}>{users.name}</td>
									<td key="edit">
										<button
											className="btn btn-primary"
											onClick={() => props.Edit(this, users)}
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
						props.Diseases
					)}
				</tbody>
			</table>
			<center> {renderPageNumbers} </center>
		</React.Fragment>
	);
}
