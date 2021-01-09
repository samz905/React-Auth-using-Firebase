import { Link } from 'react-router-dom';
import React from 'react';

const LandingPage = () => {
    return(
        <div className='landing-page'>
            <h1 className='heading'>Hello There.</h1>
            <h2 className='subheading'>Are you a User or an Administrator?</h2>
            <div className='options'>
                <Link className='option' to='/externaluser'>User</Link>
                <Link className='option' to='/login'>Admin</Link>
            </div>
        </div>
    );
}

export default LandingPage;