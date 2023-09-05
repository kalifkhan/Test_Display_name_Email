import React, { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from '../component/UserInfo';

const UserApi = () => {
    const [refreshFlag , setFlag] = useState(true);
    const [email , setEmail] = useState();
    const [ fullname , setFullname] = useState();

    useEffect(() => {

        const fetchInfo = async () => {
            try {
                const response = await axios.get("https://randomuser.me/api");
                localStorage.setItem( 'userDataInfo'  , JSON.stringify(response.data.results[0]));
            } catch (error) {
                console.log("errror is " + error);
            }
        };
        fetchInfo();

    }, [refreshFlag]);

    
    useEffect( ()=>{
        const parseJson = localStorage.getItem('userDataInfo');
        if(parseJson){
            const ParsedJSON = JSON.parse(parseJson);
            console.log(parseJson);

            const { email , name} = ParsedJSON;
            setFullname( name.first + ' ' + name.last);
            setEmail(email);
            //console.log(email)
        }
    } , [refreshFlag]);

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

