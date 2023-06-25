import React,{useState} from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import CustomSnackbar from "../uicomponents/snackbar";
import axios from 'axios';

export default function ManagerFeedback()
{
    const [feed,setFeed]=useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    function handleFeedback()
    {
        if(feed.length!==0)
        {
            axios.post('https://crm-backend-url.onrender.com/crm/send-email', {"feedBack":feed }, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                const { status } = response;
               
                if (status===200) {
                   setFeed('')
                    setSnackbarMessage('Sent Feedback Mail to Admin Successfully!!!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true); 
                } 
              })
              .catch((error) => {
                if (error.response) {
                    if (error.response.status === 500) {
                      // Handle 500 Unauthorized error
                      setFeed('')
                      setSnackbarMessage('Failed to send mail to admin!!!!');
                      setSnackbarSeverity('error');
                      setOpenSnackbar(true); 
                    } 
                    // else if (error.response.status === 404) {
                    //     // Handle 404 Not Found error
                    //   setFeed('')
                    //     setSnackbarMessage('Invalid');
                    //     setSnackbarSeverity('warning');
                    //     setOpenSnackbar(true); 
                    //   }  else if (error.response.status === 400) {
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
            setSnackbarMessage('Please fill feedback!!!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true)
        }
    }
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      };
    return(
        <div className="row feedbackContainer">
            <div className="col-lg-4 col-md-6 col-sm-12 feedback-cardContainer">
            <div>
                    <h3 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`,textAlign:'center'}}>FEEDBACK</h3>
           </div>
           <div className="card">
                        <div className="card-body">
                        <TextField id="standard-basic" label="Feedback" multiline onChange={(e)=>setFeed(e.target.value)}  maxRows={4} variant="standard" color="secondary" />
                       
                        <div className="btndiv">
                        <Button variant="contained" onClick={handleFeedback} endIcon={<SendIcon />}>
                           SUBMIT FEEDBACK
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