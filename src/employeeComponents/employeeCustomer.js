import React,{useState} from "react";
import Button from '@mui/material/Button';
import axios from 'axios';

export default function EmployeeCustomer()
{
    const [custarr,setArray]=useState([])
    function handleCustomers()
{
    axios.get(`https://crm-backend-url.onrender.com/crm/getCustomers`)
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
        <div className="employee-customerDetails">
             <div>
                    <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`,textAlign:'center'}}>Customer Information</h1>
           </div>
           <div className="btndiv">
           <Button variant="contained" onClick={handleCustomers}   color="success">
                          view customers
              </Button> 
           </div>
           <div>
            <table className="table table-striped">
            <thead>
              <tr>
              <th>S.NO</th>
             <th>CUSTOMER ID</th>
             <th>CUSTOMER NAME</th>
             <th>CUSTOMER LOCATION</th>
             <th>CUSTOMER EMAIL</th>
              </tr>
          
             
            
            </thead>
            <tbody>
                    
            {custarr.map((cust, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                 <td>{cust.customerId}</td>
                <td>{cust.customerName}</td>
                <td>{cust.customerLocation}</td>
                <td>{cust.customerEmail}</td>
              </tr>
            ))}
         
          </tbody>
            </table>  
           </div>         
        </div>
    )
}