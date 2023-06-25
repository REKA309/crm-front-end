import React from "react";
import { useLocation } from 'react-router-dom';
import Clock from '../uicomponents/clock'
import CustomChip from "../uicomponents/chip";
import Card from "../uicomponents/card";

export default function EmployeeHome()
{
    const location = useLocation();
  const useremail = location.state?.email;
    return(
        <div className="employeeContainer">
                <div className="adminAvatar">
                <CustomChip useremail={useremail} role="EMPLOYEE"/>
                </div>
                <div>
                <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`,textAlign:'center'}}>Employee Dashboard</h1>
                </div>
                <div className="digital"><Clock/></div>
                <div className="cardCollection">
                    <Card imglink="https://img.freepik.com/free-vector/checklist-concept-illustration_114360-479.jpg?size=626&ext=jpg&ga=GA1.2.2047273959.1682233859&semt=sph"
                    role="Tasks" pathloc="/employee/tasks"/>
                    <Card imglink="https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-looking-big-question-mark_1150-39362.jpg?w=740&t=st=1687147452~exp=1687148052~hmac=96540ac2b3807798343be51009f470514bbd9b7a728bcc26ba42cab8ddf616c6"
                    role="Query" pathloc="/employee/query" />
                    <Card imglink="https://img.freepik.com/free-vector/hand-drawn-flat-design-sales-representative-illustration_23-2149347412.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=ais"
                    role="Customer" pathloc="/employee/customer"/>   
                </div>
        </div>
    )
}