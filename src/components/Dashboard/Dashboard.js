import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import style from './style.module.css';


function Dashboard(props) {
    const [list, setList] = useState([]);
    const [error, setError] = useState('');
    const [data, setData] = useState([])
    const history = useHistory();
    const {logout} = useAuth();
    const details = JSON.parse(localStorage.getItem('user-details'));
    

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
            history.push('/login')
        }
    }
    const addBook = (item) => {
        console.log(item)
    }

    return (
        <>
            <button className={style["logout-btn"]} to="/login" onClick={handleLogout}>Logout</button>
            <div className={style.dashboard}>
                <div>
                <h1>Dashboard</h1>
                <Link to={`/user-details/${details}`}><button>Profile</button></Link>
                <Link to={`/book-list/`}><button>Books added to my library</button></Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Books</th>
                            <th>Authors</th>
                            <th>Add Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                          return <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.volumeInfo.title}</td>
                            <td>{item.volumeInfo.authors[0]}</td>  
                            <td><button onClick={() => addBook(item)}>Add</button></td>
                          </tr>  
                        })}
                        
                        
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Dashboard;