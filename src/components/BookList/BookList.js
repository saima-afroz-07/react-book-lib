import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

import { databaseRef } from '../../Config/Config';
import { useAuth } from '../Contexts/AuthContext';

function BookList(props) {
    const {currentUser} = useAuth();
    const [libBooks, setLibBooks] = useState([]);

    const getAllLibBooks = async () => {
        const documents = await databaseRef.collection('users').doc(currentUser?.uid).collection('books').get();
            return documents.docs.map(doc => doc.data())
    }

    useEffect(() => {
        getAllLibBooks().then(res => {
            console.log(res);
            setLibBooks(res);
            
        }).catch((err) => {
            console.log(err)
        });
    }, [currentUser])
    return (
        <div>
            <h1>My Library</h1>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Authors</th>
                    </tr>
                </thead>
                <tbody>
                   {libBooks.map((item, index) => {
                       return <tr key={item.item.id}>
                            <td>{index + 1}</td>
                            <td>{item.item.volumeInfo.title}</td>
                            <td><img src={item.item.volumeInfo.imageLinks.thumbnail} /></td>
                            <td>{item.item.volumeInfo.authors.map((author, index) => {
                                return <p key={index}>{author}</p>
                            })}</td>  
                       </tr>
                   })}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;