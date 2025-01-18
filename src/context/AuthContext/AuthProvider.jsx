import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AuthProvider = ({children}) => {

    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();
    console.log(user);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const updateUserProfile = (updatedInfo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,updatedInfo);
    }

    const loginUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const loginWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            if(currentUser){
                const userInfo = {email: currentUser?.email};

                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    console.log(res.data);
                    localStorage.setItem('access-token',res.data.token);
                    setUser(currentUser);
                    setLoading(false);
                })

            }else{
                setLoading(false);
                localStorage.removeItem('access-token');
            }
        })

        return ()=>{
            unsubscribe();
        }
    },[axiosPublic])


    const authInfo = {
        test: 'Lol',
        createUser,
        loginUser,
        loginWithGoogle,
        updateUserProfile,
        loading,
        user,
        setUser,
        logOut,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes={
    children: PropTypes.node.isRequired,
}

export default AuthProvider;