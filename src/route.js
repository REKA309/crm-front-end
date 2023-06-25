import ForgotPassword from './components/forgotPassword';
import LoginScreen from './components/loginScreen';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import ResetPassword from './components/resetPassword';
import SuperHome from './superadminComponents/superHome';
import SuperManager from './superadminComponents/superManager';
import SuperEmployee from './superadminComponents/superEmployee';
import SuperCustomer from './superadminComponents/superCustomer';
import ManagerHome from './managerComponents/managerHome';
import ManagerFeedback from './managerComponents/managerFeedback';
import ManagerEmployee from './managerComponents/managerEmployee';
import ManagerCustomer from './managerComponents/managerCustomer';
import ManagerQueries from './managerComponents/managerQueries';
import EmployeeHome from './employeeComponents/employeeHome';
import EmployeeTask from './employeeComponents/employeeTask';
import EmployeeQuery from './employeeComponents/employeeQuery';
import EmployeeCustomer from './employeeComponents/employeeCustomer';
export default function RouteFile()
{
    return(
        <Router>
        <Routes>
          <Route exact path='/' element={<LoginScreen/>} />
          <Route exact path='/reset' element={<ResetPassword/>}/>
          <Route exact path='/forgot' element={<ForgotPassword/>}/>
          <Route exact path='/superhome' element={<SuperHome/>}/>
          <Route exact path='/super/manager' element={<SuperManager/>}/>
          <Route exact path='/super/employee' element={<SuperEmployee/>}/>
          <Route exact path='/super/customer' element={<SuperCustomer/>}/>
          <Route exact path='/managerhome' element={<ManagerHome/>}/>
          <Route exact path='/manager/feedback' element={<ManagerFeedback/>}/>
          <Route exact path='/manager/employee' element={<ManagerEmployee/>}/>
          <Route exact path='/manager/customer' element={<ManagerCustomer/>}/>
          <Route exact path='/manager/queries' element={<ManagerQueries/>}/>
          <Route exact path='/employeehome' element={<EmployeeHome/>}/>
          <Route exact path='/employee/tasks' element={<EmployeeTask/>}/>
          <Route exact path='/employee/query' element={<EmployeeQuery/>} />
          <Route exact path='/employee/customer' element={<EmployeeCustomer />}/>
          <Route/>
        </Routes>
      </Router>
    )
}