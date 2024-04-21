import React, { useState, useEffect } from "react";
import Pog from '../components/Pog';
import Wallet from "./Wallet";

const Dashboard: React.FC = () => {
    const [userType, setUserType] = useState<string | null>(null);
    
    useEffect(() => {
        const userType = localStorage.getItem("userType");
        setUserType(userType);
    }, []);

    return (
        <div>
            {userType === "admin" ? (
             'hehe'   // <AdminDashboard /> 
            ) : (
                <div>
                <Pog />
                <Wallet />
                </div>
                
            )}
        </div>
    );
};

export default Dashboard;
