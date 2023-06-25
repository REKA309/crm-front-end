import React,{useState} from "react";
import { Button, TextField } from "@mui/material";
import CustomSnackbar from "../uicomponents/snackbar";
import Password from "../uicomponents/password";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function LoginScreen()
{
    const navigate=useNavigate()
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('');
   const handlePassword = (newPassword) => {
    setPassword(newPassword);
  };
  function handleForgot()
  {
    navigate("/forgot")
  }
  function handleLogin()
  {
     console.log(email,password)
     axios.post('https://crm-backend-url.onrender.com/crm/login', { "Email":email,"password":password }, { headers: { 'Content-Type': 'application/json' } })
     .then((response) => {
       console.log(response)
       const {data,status}=response
       if (data.role==="Superadmin"&& status===200) {
        setSnackbarMessage('Congrats logged in successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true); 
         navigate('/superhome',{state:{email}}); // Navigate to the next component
       } 
       else if(data.role==="Employee" && status===200)
       {
        setSnackbarMessage('Congrats logged in successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true); 
        navigate('/employeehome',{state:{email}}); // Navigate to the next component
       }
       else if(data.role==="Manager" && status===200)
       {
        setSnackbarMessage('Congrats logged in successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true); 
        navigate('/managerhome',{state:{email}}); // Navigate to the next component
       }
       
     })
     .catch((error) => {
       if (error.response) {
           if (error.response.status === 401) {
             // Handle 401 Unauthorized error
             
             setSnackbarMessage('Unauthorized access. Please check your credentials.');
             setSnackbarSeverity('warning');
             setOpenSnackbar(true); 
           } else if (error.response.status === 404) {
             // Handle 404 Not Found error
            
             setSnackbarMessage('User account doesnt exists, create new account!!!');
             setSnackbarSeverity('warning');
             setOpenSnackbar(true); 
           } else {
             // Handle other errors
             console.error('Error:', error);
             
             setSnackbarMessage('An error occurred while making the request!!!');
             setSnackbarSeverity('error');
             setOpenSnackbar(true); 
           }
         } else {
           // Handle network errors or other issues
           console.error('Error:', error);
             
             setSnackbarMessage('An error occurred while making the request!!!');
             setSnackbarSeverity('error');
             setOpenSnackbar(true); 
         }
     });
     
  }
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
   
  };
  function handleManual()
  {
    // replace this URL with the URL of your resume PDF file
    const manualUrl = 'https://docs.google.com/document/d/1dVzVx2AXK5Gi95RAw0fvqsxRl_h10MENR-oJhPBdbGI/edit?usp=sharing';
        
    // create a new anchor element
    const downloadLink = document.createElement('a');
    
    // set the href attribute of the anchor to the URL of your resume PDF file
    downloadLink.href = manualUrl;
    downloadLink.target='_blank';
    
    // set the download attribute of the anchor to the filename you want to use for the downloaded file
    downloadLink.download = 'manual.doc';
    
    // simulate a click on the anchor element to trigger the download
    downloadLink.click();
  }
  
    return(
        <div className="row loginScreen-container">
            <div className="col-lg-4 col-sm-12 col-md-6 loginCard-container">
                <div>
                    <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`}}>LOGIN PAGE</h1>
                </div>
                    <div className="card">
                        <div className="card-body">
                        <TextField id="standard-basic" label="Email"  variant="standard" color="secondary" onChange={(e)=>{setEmail(e.target.value)}}/>
                        <Password onPasswordChange={handlePassword}/>
                        <Button variant="contained" color="success"onClick={handleLogin}>LOGIN</Button>
                        <Button variant="text" color="secondary" onClick={handleForgot}>Forgot Password</Button>
                        </div>
                    </div>
                    <div className="manual">
                    <Button variant="contained" onClick={handleManual} >CRM MANUAL</Button>
                    </div>
            </div>
            <CustomSnackbar
                            open={openSnackbar}
                            message={snackbarMessage}
                            severity={snackbarSeverity}
                            onClose={handleSnackbarClose}   
                           
                         />
            
        </div>
    )
}