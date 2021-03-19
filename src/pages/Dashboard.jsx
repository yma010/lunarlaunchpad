import React,  { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../config/Firebase/FirebaseContext';
import { AuthContext } from '../session/AuthContext';

export const Dashboard = () => {
    const { authsState: { user }} = useContext(AuthContext);
    const { uid }  = user || JSON.parse(localStorage.getItem("user"));

    const firebase = useContext(FirebaseContext);
    const [ portfolioVal, setPortfolioVal ] = useState(null);

    useEffect(() => {
        if (uid)
            firebase.db.ref(`/users/${uid}`)
                .on("value", (snapshot) => (
                    setPortfolioVal(snapshot.val().portfolio_value)
                ))
    }, [firebase, uid])

    return (
        <div>
            <h1>
                {portfolioVal && <p> Investing: {portfolioVal} </p>}
            </h1>
        </div>
    )

}

export default Dashboard;