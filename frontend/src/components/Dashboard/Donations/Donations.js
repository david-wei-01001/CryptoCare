import React, { useEffect, useState } from 'react';
import './Donations.css';
import SmallButton from '../../Button/SmallButton'
import { useUser } from '../../contexts/UserContext.js';
import { firestore } from '../../FireBase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';


const Donations = () => {
  const user = useUser();  // Get user data from context
  const [totalBitcoin, setTotalBitcoin] = useState(0);
  const [totalETH, setTotalETH] = useState(0);

  // Retrieve total Donation
  useEffect(() => {
    if (user?.uid) {
      const fetchTotalDonation = async () => {
        try {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            // Update state based on whether the document has the fields
            setTotalBitcoin(userData.totalBitcoin || 0);
            setTotalETH(userData.totalETH || 0);
          } else {
            console.log("No such document!");
            setTotalBitcoin(0);
            setTotalETH(0);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setTotalBitcoin(0);
          setTotalETH(0);
        }
      };

      fetchTotalDonation();
    }
  }, [user?.uid]);

  return (
    <div className="donations-container">
      <div className="dontations-wrapper">
        <p className="donation-header">Total donations</p>
        <span className="donation-a">
          ₿{totalBitcoin.toFixed(2)}
        </span>
        <span className="donation-b">
          Ξ{totalETH.toFixed(2)}
        </span>
        <SmallButton onClick="" text="Donations"/>
      </div>
    </div>
  );
};

export default Donations;
