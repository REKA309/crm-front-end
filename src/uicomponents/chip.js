import React,{useState} from "react";
import Avatar from '@mui/material/Avatar';
import {Chip} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Modal from "../uicomponents/modal";
import CustomSnackbar from "../uicomponents/snackbar";
import axios from 'axios';

export default function CustomChip(props)
{
  const [id,setId]=useState("")
  const [loc,setLoc]=useState("");
  const [password,setPassword]=useState("");
  const [status,setStatus]=useState("")

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleStatus=(e)=>{setStatus(e.target.value)}  
  const handleLocation=(e)=>{setLoc(e.target.value)};
  const handleId=(e)=>{setId(e.target.value)}
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      function handleSubmit()
      {
       if( id.length!==0&&loc.length!==0  && password.length!==0 && status.length!==0 ) 
       {
            if(status==='Employee')
            {
              axios.post('https://crm-backend-url.onrender.com/crm/editEmployee', {"employeeId":id,"employeeLocation":loc,"password":password }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
            if (status===200) {
                setId('')
                setLoc('')
                setPassword('')
                setSnackbarMessage('Employee Updated Successfully!!!!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true); 
            }  
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                  // Handle 500 Unauthorized error
                  setId('')
                  setLoc('')
                  setPassword('')
                  setSnackbarMessage('Failed to update password!');
                  setSnackbarSeverity('warning');
                  setOpenSnackbar(true)
                } else if (error.response.status === 404) {
                  // Handle 404 Not Found error
                  setId('')
                  setLoc('')
                  setPassword('')
                  setSnackbarMessage('Invalid user!!!');
                  setSnackbarSeverity('warning');
                  setOpenSnackbar(true)
                } else {
                  // Handle other errors
                  console.error('Error:', error);
                  setSnackbarMessage('An error occurred while making the request.');
                  setSnackbarSeverity('error');
                  setOpenSnackbar(true)
                }
              } else {
                // Handle network errors or other issues
                console.error('Error:', error);
                setSnackbarMessage('An error occurred while making the request.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true)
              }
          });
            }
            if(status==='Manager')
            {
              axios.post('https://crm-backend-url.onrender.com/crm/editManager', {"managerId":id,"managerLocation":loc,"password":password }, { headers: { 'Content-Type': 'application/json' } })
              .then((response) => {
                  const { status } = response;
                 
                  if (status===200) {
                      // alert("Manager Added Successfully!!!")
                      setId('')
                      setLoc('')
                      setPassword('')
                      setSnackbarMessage('Manager Updated Successfully!!!!');
                      setSnackbarSeverity('success');
                      setOpenSnackbar(true); 
                  }  
                })
                .catch((error) => {
                  if (error.response) {
                      if (error.response.status === 500) {
                        // Handle 500 Unauthorized error
                        setId('')
                        setLoc('')
                        setPassword('')
                        setSnackbarMessage('Failed to update password!');
                        setSnackbarSeverity('warning');
                        setOpenSnackbar(true)
                      } else if (error.response.status === 404) {
                        // Handle 404 Not Found error
                        setId('')
                        setLoc('')
                        setPassword('')
                        setSnackbarMessage('Invalid user!!!');
                        setSnackbarSeverity('warning');
                        setOpenSnackbar(true)
                      } else {
                        // Handle other errors
                        console.error('Error:', error);
                        setSnackbarMessage('An error occurred while making the request.');
                        setSnackbarSeverity('error');
                        setOpenSnackbar(true)
                      }
                    } else {
                      // Handle network errors or other issues
                      console.error('Error:', error);
                      setSnackbarMessage('An error occurred while making the request.');
                      setSnackbarSeverity('error');
                      setOpenSnackbar(true)
                    }
                });
            }
           
       }
       else{
        closeModal();
        setSnackbarMessage('Please fill entire form!!!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true)
       }
      }
      const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      };
    
    
      const closeModal = () => {
        setId('')
        setLoc('');
        setPassword('');
       
      };
    return(
        <div>
    <Chip
                avatar={<Avatar alt="Superadmin" src="https://img.freepik.com/free-vector/abstract-flat-design-background_23-2148450082.jpg?size=626&ext=jpg&ga=GA1.2.2047273959.1682233859&semt=ais" />}
                label={props.useremail}
                variant="outlined"
                color="warning"
                onClick={handleOpenUserMenu}     
                />
                <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key="Edit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem key="Close" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Close</Typography>
                </MenuItem>
            </Menu>
            <Modal 
            operation="EDIT"
            role={props.role} 
            fields={[
                {label:'ID',id:'id',value:id,onChange:handleId},
                {label:'Location',id:'location',value:loc,onChange:handleLocation},
                {label:'Password',id:'pass',value:password,onChange:handlePassword}
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
        </div>
    )
}