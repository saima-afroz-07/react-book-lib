import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import style from './style.module.css';
import { databaseRef } from '../../Config/Config';
import BookListItem from '../BookListItem/BookListItem';



function Dashboard(props) {
    const [error, setError] = useState('');
    const [data, setData] = useState([])
    const history = useHistory();
    const {currentUser, logout} = useAuth();
    const [list, setList] = useState([]);
    console.log(list)
    

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=%22/*%22+orderBy=newest&maxResults=40&startIndex=1`).then(response => {
            console.log(response.data.items);
            setData(response.data.items);
        }).catch(err => {
            console.log('error => '+ err);
        })
        
    }, [])

    async function handleLogout () {
        setError('')
        try {
            setError('')
            await logout();
            history.push('/login')

        } catch {
            setError('Failed to logout');
            history.push('/login');
        }
    }
    

    return (
        <>
            <button className={style["logout-btn"]} to="/login" onClick={handleLogout}>Logout</button>
            <div className={style.dashboard}>
                <div>
                    <h1>Dashboard</h1>
                    <Link to='/user-details'><button>Profile</button></Link>
                    <Link to={`/book-list`}><button>Books added to my library</button></Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Authors</th>
                            <th>Add Book</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                        return <BookListItem item={item} index={index} key={index} list={list} setList={setList}/>
                    })}
                        
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Dashboard;