import React, { useContext, useEffect, useState } from 'react';

import { auth } from '../../Config/Config';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);
    // console.log(currentUser)

    async function signup(email, password) {
        try {
            const response = await auth.createUserWithEmailAndPassword(email, password);
            setCurrentUser(response.user);
            console.log('sign up done')
            return response.user
        } catch(error){
            console.log(error)
        }

    }
    
    function login(email, password){

        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }


    useEffect(() => {
        //this will run only when we want to mount our component. and will unsubscribe(unmount) when work is done
        //Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            console.log('auth state changed')
            localStorage.setItem('user', JSON.stringify(user));
            setLoading(false);
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
