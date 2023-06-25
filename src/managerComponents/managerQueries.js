
import React from "react";
import { useLocation } from 'react-router-dom';

export default function ManagerQueries()
{
    const location = useLocation();
    
    
    const queries=location.state?.queries
    console.log(queries)

    // const [hasData,setHasdata]=useState(false)
    console.log(queries.length)
    // if(queries.length===0){setHasdata(true)}
   
    return(
        <div className="centre-align table-box">
           
          
             
        {/* {hasData ? 555 : <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=626&ext=jpg&ga=GA1.2.2047273959.1682233859&semt=ais" alt="no data available" />} */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>EMPLOYEE ID</th>
              <th>EMPLOYEE NAME</th>
              <th>QUERIES</th>
            </tr>
          </thead>
            <tbody>
                {
                   queries.map((emp, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                       <td>{emp.employeeId }</td>
                      <td>{emp.employeeName }</td>
                      {/* <td>{emp.query?emp.query:'NA' }</td> */}
                      {emp.query.map((q,i)=>(
                        <td key={i}>
                          <div className='query-box' >
                          <p>{i+1}{q}</p>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                }
            </tbody>
        </table>
        </div>
    )
}