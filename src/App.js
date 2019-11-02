import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/Login/login';
import ForgotPassword from './components/Login/forgotpassword';
import './App.css';
import DashBoard from './components/DashBoard/Dashboard';
import Patient from './components/Patient/Patient';
import AppFooter from './components/Footer/AppFooter';
import Staff from './components/Staff/Staff';
import ManageDisease from './components/Diseases/ManageDisease';
import ManageDepartment from './components/Department/Department';
import ManageComplaints from './components/Patient/ManageComplaints';
import ManageTests from './components/Laboratory/TestList';
import ManageReports from './components/Report/ReportFilter';
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/ForgotPassword" component={ForgotPassword} />
					<Route path="/Login" component={Login} />
					<Route path="/DashBoard" component={DashBoard} />
					<Route path="/ManagePatient" component={Patient} />
					<Route path="/ManageStaff" component={Staff} />
					<Route path="/ManageDisease" component={ManageDisease} />
					<Route path="/managedepartment" component={ManageDepartment} />
					<Route path="/managecomplaints" component={ManageComplaints} />
					<Route path="/manageTests" component={ManageTests} />
					<Route path="/managereports" component={ManageReports} />
				</Switch>
			</BrowserRouter>
			<AppFooter />
		</div>
	);
}

export default App;
