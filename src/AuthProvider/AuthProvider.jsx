import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Config/firebase.config";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [User, setUser] = useState(null);

  // Signin With Google
  const googleSignin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Signup With Email and Password
  const signupEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Signup With Email and Password
  const signinEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // get User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

//   Update USer
const updateUser = (name, image) =>{
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: image
      })
}


//   signout
const signout = () =>{
    return signOut(auth);
}

  const authentications = {
    googleSignin,
    signupEmailPassword,
    signinEmailPassword,
    User,
    signout,
    updateUser
  };
  return (
    <AuthContext.Provider value={authentications}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
