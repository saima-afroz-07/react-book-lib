import React, { useEffect, useState } from 'react';

import { databaseRef } from '../../Config/Config';
import { useAuth } from '../Contexts/AuthContext';



function Profile(props) {
    const [details, setDetails] = useState({});
    const {currentUser} = useAuth(); 
    const getData = async () => {
        const data = await databaseRef.collection('users').doc(currentUser?.uid).get();
        setDetails(data.data())
        console.log(data.data())
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