import React from "react";
import {Link} from 'react-router-dom'
export default function Card(props)
{
    return(
        <div className="card">
            <img src={props.imglink} className="card-img-top" alt="rolepic" width={200} height={300}/>
            <div className="card-body">
             <ul className="navitext">
                <li>
                    <Link to={props.pathloc}>
                        {props.role}
                    </Link>
                </li>
            </ul>
            </div>
        </div>
    )
}