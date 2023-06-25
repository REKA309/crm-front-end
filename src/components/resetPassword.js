import React,{useState} from "react";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Password from "../uicomponents/password";
import axios from 'axios';
export default function ResetPassword()
{
    const navigate=useNavigate()
    const [email,setEmail]=useState('');
    const [token,setToken]=useState('');
    const [password,setPassword]=useState('')
    const handlePassword = (newPassword) => {
        setPassword(newPassword);
      };
      function handleReset()
      {
        axios.post('https://crm-backend-url.onrender.com/crm/resetPassword', {"Email":email,"resetToken":token,"newPassword":password }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
           
            if (status===200) {
                alert("Password Updated Successfully!!!")
              navigate('/'); // Navigate to the next component
            } 
            
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                  // Handle 500 Unauthorized error
                  alert('Failed to update password');
                } else if (error.response.status === 404) {
                  // Handle 404 Not Found error
                  alert('Invalid email or token!!!');
                } else {
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
        <div className="row resetContainer">
            <div className=" col-lg-4 col-sm-12 col-md-6 resetCard-container">
            <div>
                    <h2 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`}}>RESET PASSWORD</h2>
                </div>
                <div className="card">
                    <div className="card-body resetCbody">
                    <TextField id="standard-basic1" color='secondary' label="Email address"  variant="standard"onChange={(e)=>{setEmail(e.target.value)}} />
                    <TextField id="standard-basic2" color='secondary' label="Reset Token"  variant="standard"onChange={(e)=>{setToken(e.target.value)}} />
                    <Password onPasswordChange={handlePassword}/>
                    <Button variant="contained" color="success"onClick={handleReset}>RESET PASSWORD</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}