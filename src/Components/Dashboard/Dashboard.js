import React from 'react';
import useFirestore from '../Hooks/UseFirestore';
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import './Dashboard.css';

const Dashboard = () => {
    const { docs } = useFirestore('users');
    console.log(docs);

    return (
        <div>
            <div className="sidenav">
                <Link className='sidebar-element' to='/externaluser'>New User</Link>
                <Link className='sidebar-element' to='/login' onClick={Logout}>Log Out</Link>
            </div>

            <div className="main">
                <div className="table-users">
                    <div className="header">Users</div>
                    <table cellspacing="0">
                        <tr>
                            <th className='heading'>Full Name</th>
                            <th className='heading'>Phone No.</th>
                            <th className='heading'>Aadhar No.</th>
                            <th className='heading' width="230">Address</th>
                        </tr>
                        {docs && docs.map(doc => (
                            <tr>
                                <td>{doc.name}</td>
                                <td>{doc.number}</td>
                                <td>{doc.aadhar}</td>
                                <td>{doc.address}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;