import React from "react";
import { TextField } from "@mui/material";
export default function Modal({operation, role, fields, handleSubmit ,handleStatus})
{
 
    
    return(
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title fs-5" id="exampleModalLabel">{operation} {role}</h2>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
     
      
      <div className="modal-body">
      {fields.map((field,index)=>(
        <div key={index}>
            <TextField 
            id={field.id}
            label={field.label}
            variant="standard"
            color="secondary"
            onChange={field.onChange}
            value={field.value}
            />
        </div>
      ))}  
     <div className="dropBtn">
     <div className="dropdown">
      <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Select Status
      </button>
      <ul className="dropdown-menu">
        <li><button className="dropdown-item" type="button" value="Customer" onClick={handleStatus}>Customer</button></li>
        <li><button className="dropdown-item" type="button"  value="Employee" onClick={handleStatus}>Employee</button></li>
        <li><button className="dropdown-item" type="button" value="Manager" onClick={handleStatus}>Manager</button></li>
      </ul>
    </div>
     </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>{operation} {role}</button>
      </div>
    </div>
  </div>
</div>
    )
}