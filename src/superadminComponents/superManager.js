import React,{useState} from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../uicomponents/modal";
import CustomSnackbar from "../uicomponents/snackbar";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import axios from 'axios';

export default function SuperManager()
{
    const [id,setId]=useState("")
    const [name,setName]=useState("");
    const [loc,setLoc]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [status,setStatus]=useState("")
    const [manarray,setArray]=useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleId=(e)=>{setId(e.target.value)};
    const handleName=(e)=>{setName(e.target.value)};
    const handleLocation=(e)=>{setLoc(e.target.value)};
    const handleEmail=(e)=>{setEmail(e.target.value)};
    const handlePassword = (e) => {
        setPassword(e.target.value);
      };
      const handleStatus=(e)=>{setStatus(e.target.value)}
    
      function handleSubmit()
      {
       if(id.length!==0 && name.length!==0 && loc.length!==0 && email.length!==0 && password.length!==0 && status.length!==0) 
       {
        axios.post('https://crm-backend-url.onrender.com/crm/createManager', {"managerId":id,"managerName":name,"managerLocation":loc,"Email":email,"password":password,"role":status }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
           
            if (status===200) {
                closeModal();
                setSnackbarMessage('Manager added successfully!');
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
                } else if (error.response.status === 409) {
                  // Handle 404 Not Found error
                  closeModal();
                  setSnackbarMessage('User already exists');
                  setSnackbarSeverity('warning');
                  setOpenSnackbar(true); 
                }  else if (error.response.status === 400) {
                  // Handle 404 Not Found error
                  closeModal();
                  setSnackbarMessage('Bad Request!!!');
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
       else{
        closeModal();
        setSnackbarMessage('Please fill entire form!!!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true)
       }
      }
      function handleEdit(event)
      {
        event.preventDefault();
  
        //
        if(id.length!==0&& loc.length!==0 && password.length!==0)
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
        else{
          closeModal();
        setSnackbarMessage('Please fill entire form!!!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true)
        }
      }
      function handleDelete(event)
      {
        event.preventDefault();
        if(id.length!==0)
        {
          axios.post('https://crm-backend-url.onrender.com/crm/deleteManager', {"managerId":id }, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => {
              const { status } = response;
             
              if (status===200) {
                  // alert("Manager Added Successfully!!!")
                  setId('')
                  setSnackbarMessage('Manager Deleted Successfully!!!!');
                  setSnackbarSeverity('success');
                  setOpenSnackbar(true); 
              }  
            })
            .catch((error) => {
              if (error.response) {
                  if (error.response.status === 500) {
                    // Handle 500 Unauthorized error
                    setId('')                  
                    setSnackbarMessage('Failed to delete!');
                    setSnackbarSeverity('warning');
                    setOpenSnackbar(true)
                  } else if (error.response.status === 404) {
                    // Handle 404 Not Found error
                    setId('')
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
        setName('');
        setEmail('');
        setLoc('');
        setPassword('');
        setStatus('')
      };
      function viewManagers()
      {
        axios.get(`https://crm-backend-url.onrender.com/crm/getManagers`)
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
        <div className="super-managerContainer">
            <div>
            <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`,textAlign:'center'}}>Manager</h1>
            </div>  
            <div className="addicon gapBtn">
            <Button variant="contained"   color="success" onClick={viewManagers}>
                            view managers
              </Button> 
            <Fab color="primary" aria-label="add"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                <AddIcon />
            </Fab>
             {/* Modal with name and email inputs */}
                  
                        <Modal
                         operation="ADD"
                        role="MANAGER" 
                        fields={[
                            {label:'ID',id:'idno',value:id,onChange:handleId},
                            { label: 'Name',id:"name", value: name, onChange: handleName },
                            {label:'Location',id:'location',value:loc,onChange:handleLocation},
                            { label: 'Email',id:'email',value: email, onChange: handleEmail },
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
            <div >
              <form onSubmit={handleEdit}className="crud-container">
                <TextField id="standard-basic1" label="Manager Id"  variant="standard" value={id} color="secondary" onChange={(e)=>{setId(e.target.value)}} />
                <TextField id="standard-basic2" label="Location"  variant="standard" value={loc} color="secondary" onChange={(e)=>{setLoc(e.target.value)}}/>
                <TextField id="standard-basic3" label="Password"  variant="standard" value={password} color="secondary" onChange={(e)=>{setPassword(e.target.value)}} />
               <div className="btndiv">
               <Button variant="contained" color="success" type="submit">
                              EDIT MANAGER
                </Button>
               </div>
            </form>             
            </div>   
            <div >
              <form onSubmit={handleDelete}className="crud-container">
              <TextField id="standard-basic4" label="Manager Id"  variant="standard" value={id} color="secondary" onChange={(e)=>{setId(e.target.value)}} />
              <div className="btndiv">
              <Button variant="contained" type="submit"  color="error">
                            DELETE MANAGER
              </Button> 
              </div>
            </form>            
            </div>
            <div>
            <table className="table table-striped">
            <thead>
            <tr>
            <th>S.NO</th>
             <th>MANAGER ID</th>
             <th>MANAGER NAME</th>
             <th>MANAGER LOCATION</th>
             <th>MANAGER EMAIL</th>
             <th>MANAGER PASSWORD</th>
            </tr>           
            </thead>
            <tbody>
                    
            {manarray.map((man, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                 <td>{man.managerId}</td>
                <td>{man.managerName}</td>
                <td>{man.managerLocation}</td>
                <td>{man.Email}</td>
                <td>{man.password}</td>
               
              </tr>
            ))}
         
          </tbody>
            </table>  
            </div>        
        </div>
    )
}