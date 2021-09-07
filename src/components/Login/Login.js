import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import style from './style.module.css';
import { useAuth } from '../Contexts/AuthContext';

function Login(props) {
    const [error, setError] = useState('');
    const {currentUser, login} = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const schema = yup.object().shape({
        email: yup.string().email().max(20).required(),
        password: yup.string().max(15).required(),
    })

    const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(schema)});


    const onSubmit = async (data) => {

        try {
            setError('');
            setLoading(true);
            await login(data.email, data.password);
            history.push("/dashboard");
            console.log(currentUser);
        } catch {
            setError('Failed to create an account');
            console.log(data.email, data.password, currentUser);
        }
        setLoading(false);
    }
    console.log(errors)
    

    return (
        <div>
            <h1>Login</h1>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <input type="text" placeholder="Email" {...register('email')} name="email"/>
                    <p className={style.errorMsg}>{errors.email?.message}</p>
                </div>

                <div>
                    <input type="password" placeholder="Password" {...register('password')}/>
                    <p className={style.errorMsg}>{errors.password?.message}</p>
                </div>

                <button className={style["submit-btn"]} type="submit">Submit</button>

            </form>
        </div>
    );
}

export default Login;