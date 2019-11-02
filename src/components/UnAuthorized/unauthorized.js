import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
export default function unauthorized(props) {
    return (
        <React.Fragment>
			<Header user={props.location.state.props.user} role={props.location.state.props.role} />
        <div className="alert alert-warning">
            You do not have the rights to view this page!
        </div>
        </React.Fragment>
    )
}
