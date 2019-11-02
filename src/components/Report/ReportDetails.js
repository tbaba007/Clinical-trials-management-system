import React from 'react'

export default function ReportDetails(props) {
    debugger;
    const {medicalDetails}=props;
    return (
        
               medicalDetails!==null?
        <center><div className="row" style={{width:'100%',border:'1px solid black',borderRadius:'20px'}}>
            <br/>

            <div className="col-md-5">
            Date Visited: <label style={{fontWeight:"bold"}}>{props.medicalDetails.datevisited}</label>
            <br/>
            Complaint: <label style={{fontWeight:"bold"}}>{props.medicalDetails.complaints}</label>
            <br/>
            Test Required?: <label style={{fontWeight:"bold"}}>{props.medicalDetails.istestrequired}</label>
            <br/>
            Test Details: <label style={{fontWeight:"bold"}}>{props.medicalDetails.testdetails}</label>
            <br/>
            Test Results: <label style={{fontWeight:"bold"}}>{props.medicalDetails.testresult===null?
            "No Results Yet":props.medicalDetails.testresult.testupload}</label>
            <br/>
            </div>

            <div className="col-md-5">
            Test Done By: <label style={{fontWeight:"bold"}}>{props.medicalDetails.user===null?
            "No One has conducted test for the patient":props.medicalDetails.user.name}</label>
            <br/>
            Diagnosed <label style={{fontWeight:"bold"}}>{props.medicalDetails.condition===null?
            "No Diagnosis Yet":props.medicalDetails.condition.name}</label>
            <br/>
            Prescription: <label style={{fontWeight:"bold"}}>{props.medicalDetails.prescription===''?"No prescription Yet"
            :props.medicalDetails.prescription}</label>
            <br/>
            Doctor: <label style={{fontWeight:"bold"}}>{props.medicalDetails.user===null?"No doctor yet"
            :props.medicalDetails.user.name}</label>
            <br/>
            </div>
        </div></center>:<div></div>
        
    )
}
