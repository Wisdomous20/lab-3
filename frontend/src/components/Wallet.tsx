import React, { useEffect, useState } from 'react';
// import { getWalletByUser } from 'wallet api';

const Wallet: React.FC = () => {
  const [walletAmount, setWalletAmount] = useState<number | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
    //   try {
    //     const userWalletData = await getWalletByUser(); 
    //     setWalletAmount(userWalletData.amount); 
    //   } catch (error) {
    //     console.error('Error fetching wallet data:', error);
    //   }
    setWalletAmount(1000); 
    };

    fetchWalletData();
  }, []); 

  return (
    <div className="p-4 bg-gray-200 rounded-md shadow-md">
      <h2 className="mb-2 text-lg font-semibold">Your Wallet</h2>
      {walletAmount !== null ? (
        <p className="text-xl font-bold">Balance: ${walletAmount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Wallet;
