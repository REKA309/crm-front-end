import React from "react";
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {Chip} from '@mui/material';
import Card from "../uicomponents/card";
import Clock from '../uicomponents/clock'
export default function SuperHome()
{
  
    const location = useLocation();
  const useremail = location.state?.email;
  
    return(
       <div className=" superContainer">
        
        <div className="adminAvatar">
         <Chip
                avatar={<Avatar alt="Superadmin" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevp65kzj8u4QXw_AWnteewL4b-BIHJZGlmA&usqp=CAU" />}
                label={useremail}
                variant="outlined"
                color="warning"      
        />
        </div>
        <div>
        <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`,textAlign:'center'}}>Superadmin  Dashboard</h1>
        </div>
        <div className="digital"><Clock/></div>
        
        <div className="cardCollection">
        <Card imglink="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-businessman_516790-114.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=ais"
          role="Manager" pathloc="/super/manager"/>
         <Card imglink="https://img.freepik.com/free-vector/team-concept-illustration_114360-678.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=ais"
          role="Employee" pathloc="/super/employee"/>
          <Card imglink="https://img.freepik.com/free-vector/hand-drawn-flat-design-sales-representative-illustration_23-2149347412.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=ais"
          role="Customer" pathloc="/super/customer"/>
        </div>
       </div>
    )
}