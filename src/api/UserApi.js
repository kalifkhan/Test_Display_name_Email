import React, { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from '../component/UserInfo';

const UserApi = () => {
    const [refreshFlag , setFlag] = useState(true);
    const [email , setEmail] = useState();
    const [ fullname , setFullname] = useState();

    // fetch function and setItem into Localstorage 
    const fetchInfo = async () => {
        try {
            const response = await axios.get('https://randomuser.me/api');
            localStorage.setItem( 'userDataInfo'  , JSON.stringify(response.data.results));
        } catch (error) {
            console.log("errror is " + error);
        }
    };
    // parse function and getItem from localstorage into state(key)
    const ParseUserData=()=>{
        const parseJson = localStorage.getItem('userDataInfo');
        if(parseJson){
            const ParsedJSON = JSON.parse(parseJson);
            //console.log(parseJson);

            const { email , name} = ParsedJSON[0];
            setFullname( name.first + ' ' + name.last);
            setEmail(email);
        }
    }
    //useEffect to call a API and Display the userInfo whenever refreshed button changes. 
    useEffect(() => {
        fetchInfo();
        ParseUserData();
    }, [refreshFlag]);

    const handleRefresh=()=>{
        setFlag(!refreshFlag);
    }
    
    return <>
        <div> 
            <UserInfo fullname={fullname} email={email}> </UserInfo>
            <button onClick={handleRefresh}> Refresh </button>
        </div>
    </>
}

export default UserApi;

