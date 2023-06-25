import React,{useState} from "react";
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CustomSnackbar from "../uicomponents/snackbar";
import axios from 'axios';

export default function EmployeeQuery()
{
    const [query,setQuery]=useState("")
    const [eid,setEid]=useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      };
    function handleQuery()
    {
        if(query.length!==0 && eid.length!==0)
        {
            axios.post('https://crm-backend-url.onrender.com/crm/askQuery', {"employeeId":eid,"doubt":query}, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                const { status } = response;
               
                if (status===200) {
                  setEid('')
                     setQuery('')
                    setSnackbarMessage('Query sent Successfully!!!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true); 
                } 
              })
              .catch((error) => {
                if (error.response) {
                    if (error.response.status === 500) {
                      // Handle 500 Unauthorized error
                      setEid('')
                      setQuery('')
                      setSnackbarMessage('Failed to send query!!!!');
                      setSnackbarSeverity('error');
                      setOpenSnackbar(true); 
                    } 
                    else if (error.response.status === 404) {
                        // Handle 404 Not Found error
                        setEid('')
                        setQuery('')
                        setSnackbarMessage('Invalid');
                        setSnackbarSeverity('warning');
                        setOpenSnackbar(true); 
                      } 
                    //  else if (error.response.status === 400) {
                    //     // Handle 404 Not Found error
                    //     setFeed('')
                    //     setSnackbarMessage('Bad Request!!!');
                    //     setSnackbarSeverity('warning');
                    //     setOpenSnackbar(true); 
                    //   } 
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
            setSnackbarMessage('Please fill query!!!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true)
        }
    }
    return(
        <div className="employee-queryContainer">
            <div className="query-container">
            <div>
                    <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`,textAlign:'center',color:'coral'}}>Query</h1>
           </div>
                <div className="card">
                    <div className="card-body">
                    <TextField id="standard-basic2" label="Employee Id" variant="standard" color="secondary" onChange={(e)=>{setEid(e.target.value)}}/>
                    <TextField id="standard-basic1" label="Query" multiline maxRows={4} variant="standard" color="secondary" onChange={(e)=>{setQuery(e.target.value)}}/>
                    <div className="btndiv">
                        <Button variant="contained" onClick={handleQuery} endIcon={<SendIcon />}>
                           SUBMIT QUERY
                        </Button>
                        </div>
                    </div>
                </div>
                <CustomSnackbar
                            open={openSnackbar}
                            message={snackbarMessage}
                            severity={snackbarSeverity}
                            onClose={handleSnackbarClose}   
                           
                         />
            </div>
        </div>
    )
}