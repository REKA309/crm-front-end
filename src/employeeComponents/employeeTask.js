import React,{useState} from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import CustomSnackbar from "../uicomponents/snackbar";
import axios from 'axios';

export default function EmployeeTask()
{
    const [eid,setEid]=useState("")
    const [taskarr,setArray]=useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      };
    function handletask(){
        axios.get(`https://crm-backend-url.onrender.com/crm/viewTasks/${eid}`)
        .then((res )=>{
           
            setArray(res.data)
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 500) {
                // Handle 500 Unauthorized error
               
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
    return(
        <div className="employee-Task">
             <div className="taskdiv">
             <TextField id="standard-basic2" label="Employee Id" variant="standard" color="secondary" onChange={(e)=>{setEid(e.target.value)}}/>
             <Button variant="contained" color="success" onClick={handletask}>
                           ASSIGNED TASKS
             </Button>   
            </div>   
            
            <CustomSnackbar
                            open={openSnackbar}
                            message={snackbarMessage}
                            severity={snackbarSeverity}
                            onClose={handleSnackbarClose}   
                         />  
            <div className="taskdiv">
            <table className="table table-striped">
          <thead>
            <tr>
              <th>S.NO</th>
              
              <th>TASKS</th>
            </tr>
          </thead>
            <tbody>
                {
                  taskarr.map((task, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                       <td>{task}</td>
                      
                    </tr>
                  ))
                }
            </tbody>
        </table>
            </div>      
        </div>
    )
}