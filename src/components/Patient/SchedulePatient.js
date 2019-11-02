import React,{useState,useRef,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Assets/styles/common.css';
import { Api } from '../../Helper/Api';
export default function SchedulePatient(props)
{
    
    const [bp,setBp]=useState(0);
    const [weight,setWeight]=useState(0);
    const Inputfocus=useRef(null);
    const [doctorid,setDoctorid]=useState(0);
    useEffect(()=>{
        Inputfocus.current.focus();
    },[])
    const handleBpchange=(e)=>{
        setBp(e.target.value);
    }
    const handleWeightChange=(e)=>{
        setWeight(e.target.value);
    }
    const handleDoctorChange=e=>{
        setDoctorid(e.target.value);
    }

    const SchedulePatient=e=>{
       
        if(bp===0)
        {
            return alert('Enter patient bp');
        }
        if(weight===0)
        {
            return alert('Enter patient weight');
        }
        if(doctorid<1)
        {
            return alert('Select a doctor for this patient');
        }
        var patientData={
            patientid:props.userdata.id,
            datevisited:new Date().getFullYear() +
            '-' +
            (parseInt(new Date().getMonth().toString()) + 1) +
            '-' +
            new Date().getDate(),
            weight:weight,
            bp:bp,
            attendedto:"FALSE",
            doctorvisited:doctorid
        };
        fetch(Api+"medicalhistory/schedule",{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(patientData)
        }).then(res=>res.text())
        .then(success=>{
            alert('Patient scheduled successfully!')
          window.location.reload(true);
        }).catch(err=>{
            alert('An error occured while processing your request!.')
        })
    }


    return(
        <div>
            <h3>Schedule Patient</h3>
            <br/>
            Name : <label style={{fontWeight:"bold"}}>{props.userdata.name}</label>
            <br/>
            Email Address : <label style={{fontWeight:"bold"}}>{props.userdata.email}</label>
            <br/>
            Mobile Number : <label style={{fontWeight:"bold"}}>{props.userdata.mobilenumber}</label>
            <br/>
            <span className="logintextheader">Enter Blood Pressure</span>&nbsp;
					<input
						type="number"
						ref={Inputfocus}
						value={bp}
						onChange={handleBpchange}
						className="form-control LoginInputTextSize"
						placeholder="Enter BP"
					/>
            <span className="logintextheader">Enter Weight</span>&nbsp;
					<input
						type="number"
						value={weight}
						onChange={handleWeightChange}
						className="form-control LoginInputTextSize"
						placeholder="Enter Weight"
					/>
                    <br/>
                    <span className="logintextheader">Select Doctor</span>&nbsp;
					<select
						
						value={doctorid}
						onChange={handleDoctorChange}
                        className="form-control "
                        style={{width:'50%',marginLeft:'20px'}}
					>
                          <option value="" key="0">--Select--</option>
                        {props.doctorList!==undefined && props.doctorList.length>0?
                      
                       props.doctorList.map((x,index)=>{
                            return <option value={x.id} key={index}>{x.name}</option>
                        }):0}
                    </select>
                    <br/>
            <button className="btn btn-success" onClick={()=>SchedulePatient()}>Schedule</button>        
        </div>
    )
}