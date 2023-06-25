import React,{useEffect} from "react";
import { useLocation } from 'react-router-dom';
import Clock from '../uicomponents/clock'
import Card from "../uicomponents/card";
import CustomChip from "../uicomponents/chip";
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../reduxFolder/userActions';
export default function ManagerHome()
{
    const location = useLocation();
    const useremail = location.state?.email;
  const dispatch = useDispatch();

  useEffect(() => {
    if (useremail) {
      dispatch(setUserEmail(useremail));
    }
  }, [dispatch, useremail]);
    return(
        <div className="managerContainer">
             <div className="adminAvatar">
                <CustomChip useremail={useremail} role="MANAGER"/>
          
                </div>
               
                <div>
                <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`,textAlign:'center'}}>Manager Dashboard</h1>
                </div>
                <div className="digital"><Clock/></div>
                <div className="cardCollection">
                    <Card imglink="https://img.freepik.com/free-vector/online-review-concept-illustration_114360-1398.jpg?size=626&ext=jpg&ga=GA1.2.2047273959.1682233859&semt=ais"
                    role="Feedback" pathloc="/manager/feedback"/>
                    <Card imglink="https://img.freepik.com/free-vector/team-concept-illustration_114360-678.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=ais"
                    role="Employee" pathloc="/manager/employee"/>
                    <Card imglink="https://img.freepik.com/free-vector/hand-drawn-flat-design-sales-representative-illustration_23-2149347412.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=ais"
                    role="Customer" pathloc="/manager/customer"/>   
                </div>
                </div>
    )
}