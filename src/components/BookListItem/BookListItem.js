import React, { useEffect, useState } from 'react';

import { databaseRef } from '../../Config/Config';
import { useAuth } from '../Contexts/AuthContext';

function BookListItem({item, index, list, setList}) {
    const [bookStatus, setBookStatus] = useState(false);
    const [buttonText, setButtonText] = useState('Add');
    const {currentUser} = useAuth();

    const addRemoveBook = (ele) => {
        if(ele.id === item.id){
            if(bookStatus){
                const updateList = list.filter(each_item => each_item.id !== ele.id);
                setList(updateList);
                console.log(updateList);
                databaseRef.collection('users').doc(currentUser?.uid).collection('books').doc(ele.id).delete().then(() => {
                    console.log('Succesfully deleted', ele.id);
                }).catch((err) =>{
                    console.log('Error in adding data ', err);
                });
                console.log(list)
                setBookStatus(false)
                setButtonText('Add');

            } else {
                list.push(item);
                setList(list);
                console.log(list);
                databaseRef.collection('users').doc(currentUser?.uid).collection('books').doc(ele.id).set({item}).then(() => {
                    console.log('Succesfully book Added');
                }).catch((err) =>{
                    console.log('Error in adding data ', err);
                });
                setBookStatus(true)
                setButtonText('Remove');
            }
        }
        
    }

    const getData = () => {
        
    }

    useEffect(() => {
        getData()

    }, [])
    
    return (
         <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.volumeInfo.title}</td>
            <td><img src={item.volumeInfo.imageLinks.thumbnail} /></td>
            <td>{item.volumeInfo.authors.map((author, index) => {
                return <p key={index}>{author}</p>
            })}</td>  
            <td><button onClick={() => addRemoveBook(item)}>{buttonText}</button></td>
        </tr>  
    );
}

export default BookListItem;