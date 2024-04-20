import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../FireBase/firebase.js';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(firestore, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUserDetails({
                        uid: user.uid,
                        email: user.email, // from Firebase Auth
                    });
                } else {
                    console.log("No user data available");
                    // Still set basic details from Firebase Auth
                    setUserDetails({
                        uid: user.uid,
                        email: user.email
                    });
                }
            } else {
                setUserDetails(null);
            }
        });

        return () => unsubscribe();  // Clean up the subscription
    }, []);

    return (
        <UserContext.Provider value={userDetails}>
            {children}
        </UserContext.Provider>
    );
};
