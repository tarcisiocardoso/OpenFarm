import React, { useEffect } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';


function NotFound() {

    const location = useLocation();  

    useEffect(() => {
        console.log("--->", location );

    });
    
    return (
        <div className="page-not-found">
            <h1 className="title">
                404
            </h1>
            <div className="desc">
                The Page you're looking for was not found.
            </div>
            <Link to="/"><button className="go-back-btn btn btn-primary" type="button">Go Back</button></Link>
            { (location.pathname === '/') ? <Redirect to="/home" /> : ""}
        </div>
    );

}

export default NotFound;