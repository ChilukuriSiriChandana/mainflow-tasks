import React from 'react';
import { Link } from 'react-router-dom';



export function Index() {
  return (
    <div >
            
    <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
        <div>
            <Link to="/login" className='btn btn-warning me-2'> Existing User Login</Link>
            <Link to="/signup" className='btn btn-warning'>New User Register</Link>
        </div>
    </div>
</div>
  )
}


