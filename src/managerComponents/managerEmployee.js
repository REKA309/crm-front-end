import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CustomSnackbar from "../uicomponents/snackbar";
import Modal from "../uicomponents/modal";
import { useSelector } from 'react-redux';
import {Chip} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

export default function ManagerEmployee()
{
    const useremail = useSelector(state => state.user.useremail);
    let queries=[]
    const [status,setStatus]=useState("");
    const [id,setId]=useState("");
    const [assign,setAssign]=useState("")
    const [emparray,setArray]=useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const navigate=useNavigate();
    const handleId=(e)=>{setId(e.target.value)};
    const handleStatus=(e)=>{setStatus(e.target.value)}
    const handleAssign=(e)=>{setAssign(e.target.value)}
   
    function handleSubmit()
    {
        if(id.length!==0 &&assign.length!==0&&status.length!==0 )
        {
            axios.post('https://crm-backend-url.onrender.com/crm/assignTask', {"employeeId":id,"task":assign }, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                const { status } = response;
               
                if (status===200) {
                    closeModal();
                    setSnackbarMessage('Assigned task successfully!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true); 
                } 
              })
              .catch((error) => {
                if (error.response) {
                    if (error.response.status === 500) {
                      // Handle 500 Unauthorized error
                      closeModal();
                      setSnackbarMessage('Failed to create !!!!');
                      setSnackbarSeverity('error');
                      setOpenSnackbar(true); 
                    }   else if (error.response.status === 404) {
                      // Handle 404 Not Found error
                      closeModal();
                      setSnackbarMessage('User not found !!!');
                      setSnackbarSeverity('warning');
                      setOpenSnackbar(true); 
                    } 
                    else {
                      // Handle other errors
                      console.error('Error:', error);
                      setSnackbarMessage('Error occured');
                      setSnackbarSeverity('error');
                      setOpenSnackbar(true);
                    }
                  } else {
                    // Handle network errors or other issues
                    console.error('Error:', error);
                    setSnackbarMessage('Error occured!!');
                      setSnackbarSeverity('error');
                      setOpenSnackbar(true);
                  }
              });
        }
        else
        {
            closeModal();
            setSnackbarMessage('Please fill task description!!!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true)
        }
    } 
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      };
      const closeModal = () => {
        setId('')
        setAssign('')
        setStatus('')
      }; 
      function handleQueries()
      {
        axios.get(`https://crm-backend-url.onrender.com/crm/view/employees/queries/${useremail}`)
        .then((res )=>{
            console.log(res.data)
          queries=[...res.data]
          console.log(queries)
          navigate("/manager/queries",{state:{queries}})
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 500) {
                // Handle 500 Unauthorized error
                closeModal();
                setSnackbarMessage('Failed to retrieve !!!!');
                setSnackbarSeverity('error');
                setOpenSnackbar(true); 
              }  
              else {
                // Handle other errors
                console.error('Error:', error);
                setSnackbarMessage('Error occured');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
              }
          } else {
            // Handle network errors or other issues
            console.error('Error:', error);
            alert('An error occurred while making the request.');
          }
        });

        
      }
      function handleEmployees()
      {
        axios.get(`https://crm-backend-url.onrender.com/crm/viewMangersEmp/${useremail}`)
        .then((res )=>{
      
          setArray(res.data)
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 500) {
              // Handle 500
              alert('Failed to retrieve.');
            }  else {
              // Handle other errors
              console.error('Error:', error);
              alert('An error occurred while making the request.');
            }
          } else {
            // Handle network errors or other issues
            console.error('Error:', error);
            alert('An error occurred while making the request.');
          }
        });
      } 
    return(
        <div className="manager-employeeContainer">
            <div>
            <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`,textAlign:'center'}}>Employee</h1>
            
            </div>
                    <div className="adminAvatar gapbtn">
                    <Button variant="contained" onClick={handleEmployees}  color="success">
                            view employees
                    </Button> 
                        <Chip
                                avatar={<Avatar alt="Manager" src="https://img.freepik.com/free-vector/abstract-flat-design-background_23-2148450082.jpg?size=626&ext=jpg&ga=GA1.2.2047273959.1682233859&semt=ais" />}
                                label={useremail}
                                variant="outlined"
                                color="warning"      
                        />
                </div>
            <div className="assignDiv">
                <Button variant="contained" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                          ASSIGN TASK
                </Button>
                {/* Modal with name and email inputs */}
                <Modal
                        operation="ASSIGN"
                        role="TASK" 
                        fields={[
                            {label:'Employee ID',id:'idno',value:id,onChange:handleId},
                            {label:'Task Description',id:'assign',value:assign,onChange:handleAssign},
                        ]}
                        handleSubmit={handleSubmit}
                        status={status}
                        handleStatus={handleStatus}
                          />
                        <CustomSnackbar
                            open={openSnackbar}
                            message={snackbarMessage}
                            severity={snackbarSeverity}
                            onClose={handleSnackbarClose}   
                         />
                        <Button variant="contained" onClick={handleQueries} color="success">
                           Queries
                        </Button>
            </div>
            <div>
            <table className="table table-striped">
            <thead>
            <tr>
            <th>S.NO</th>
             <th>EMPLOYEE ID</th>
             <th>EMPLOYEE NAME</th>
             <th>EMPLOYEE LOCATION</th>
             <th>EMPLOYEE EMAIL</th>
             
            </tr>
            </thead>
            <tbody>
                    
            {emparray.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                 <td>{emp.employeeId}</td>
                <td>{emp.employeeName}</td>
                <td>{emp.employeeLocation}</td>
                <td>{emp.Email}</td>
                
                
              </tr>
            ))}
         
          </tbody>
            </table>  
            </div>      
        </div>
    )
}
