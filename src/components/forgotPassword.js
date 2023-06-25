import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
export default function ForgotPassword()
{
    const [email,setEmail]=useState('')
    const navigate=useNavigate()
    function handleOtp(){
        if(email.length!==0)
        {
          axios.post('https://crm-backend-url.onrender.com/crm/forgotPassword', { "Email":email}, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
            
            if ( status===200) {
                alert("Random String sent to your respective email address ")
              navigate('/reset'); // Navigate to the next component
            } 
            
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                  // Handle 500 Unauthorized error
                  alert('Failed to send the random string.');
                } else if (error.response.status === 404) {
                  // Handle 404 Not Found error
                  console.log(error)
                  alert('User account doesnt exists, create new account!!!');
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
        else
        {
          alert("Enter valid mail id")
        }
        }
    return(
        <div className="row forgotPassword-container">
            <div className="col-lg-4 col-md-6 col-sm-12 forgotCard-container">
                <div>
                    <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`}}>FORGOT PASSWORD</h1>
                </div>
                <div className="card">
                    <div className="card-body forgotCbody">
                    <TextField id="standard-basic" label="Email address" color="primary" variant="standard"onChange={(e)=>{setEmail(e.target.value)}} />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleOtp}>
                     Send OTP
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}