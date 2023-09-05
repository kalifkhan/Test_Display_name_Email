import React from 'react';
import './UserInfo.css'

const UserInfo=( {fullname , email })=>{
    return <>
            <div className='container-userinfo'>
                <h3> {fullname} </h3>
                <p> {email} </p>
            </div>
    </>
}

export default UserInfo;
