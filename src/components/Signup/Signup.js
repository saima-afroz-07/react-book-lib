import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import style from './style.module.css'
import { databaseRef } from '../../Config/Config';



function Signup() {
    const {currentUser, signup} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const schema = yup.object().shape({
        FullName: yup.string().max(20).required(),
        Email: yup.string().email().max(20).required(),
        Phone: yup.number().required().positive().integer(),
        Gender: yup.string().required(),
        Country: yup.string().required(),
        Password: yup.string().max(15).required(),
        Terms: yup.boolean().required()
    })



    const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(schema)});

    
   
    // console.log(currentUser)

    

    const onSubmit = async (data) => {
        // if(passwordRef.current.value !== passwordConfirmRef.current.value){
        //     return setError('Password do not match')
        // } 

        try {
            // debugger;
            setError('');
            setLoading(true);
            const data_firestore = await signup(data.Email, data.Password)

            const details = {FullName: data.FullName,
                Email: data.Email,
                Phone: data.Phone,
                Gender: data.Gender,
                Country: data.Country,
                Password: data.Password,
                Terms: data.Terms};
            databaseRef.collection('users').doc(data_firestore?.uid).set(details).then(() => {
                console.log('Succesfully Data Added');
            }).catch((err) =>{
                console.log('Error in adding data ', err);
            })
            

            console.log(data_firestore);
            history.push("/dashboard");
            
        } catch(err) {
            setError('Failed to create an account');
            console.log(data.Email, data.Password, err)
        }
        setLoading(false);
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" placeholder="Full Name" {...register('FullName')}/>
                    <p className={style.errorMsg}>{errors.FullName?.message}</p>
                </div>

                <div>
                    <input type="text" placeholder="Email" {...register('Email')}/>
                    <p className={style.errorMsg}>{errors.Email?.message}</p>
                </div>

                <div>
                    <input type="text" placeholder="Phone" {...register('Phone')}/>
                    <p className={style.errorMsg}>{errors.Phone?.message}</p>
                </div>

                <div>
                    <label>Select Gender</label>
                    <div className={style.gender}>
                        <input type="radio"  value="male" {...register('Gender')}/>
                        <p>Male</p>

                        <input type="radio"  value="female" {...register('Gender')}/>
                        <p>Female</p>
                    </div>
                    <p className={style.errorMsg}>{errors.Gender ? "This Field is Required.": ""}</p>
                    
                </div>

                <div>
                <select {...register('Country')}>
                    <option value="">Country</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                </select>
                <p className={style.errorMsg}>{errors.Country?.message}</p>
                </div>

                <div>
                    <input type="password" placeholder="Password" {...register('Password')}/>
                    <p className={style.errorMsg}>{errors.Password?.message}</p>
                </div>

                {/* <div>
                    <input type="password" placeholder="Re-enter Password" {...register('')}/>
                </div> */}

                <div className={style.terms}>
                    <input type="checkbox" {...register('Terms')}/>
                    <label>I agree with terms and condition</label>
                </div>

                <button className={style["submit-btn"]} type="submit">Submit</button>

            </form>
        </div>
    )
}

export default Signup
