import React, { useEffect, useState } from 'react';

import { databaseRef } from '../../Config/Config';
import { useAuth } from '../Contexts/AuthContext';



function Profile(props) {
    const [details, setDetails] = useState({});
    const {currentUser} = useAuth(); 
    const getData = async () => {
        const data = await databaseRef.collection('users').doc(currentUser?.uid).get();
        setDetails(data.data());
        // if(details){
        //     Object.keys(details).map(ele => {
        //         if(ele === 'Password'){
        //             details['Password'] = "************"
        //         }
        //         return ele
        //     })
        //     console.log(details) 
        // }
        console.log(data.data());
        let userInfo = data.data() || {};
        userInfo.Password = "***********"
        setDetails(userInfo)
    }
    useEffect(() => {
        getData();
    }, [currentUser])

    return (
        <div>
            {details && Object.keys(details).map((item, index) => {
               return <h1 key={index}>{item} : <span style={{color: 'darkGrey'}}>{(details[item]).toString()}</span></h1>
            })}
        </div>
    );
}

export default Profile;