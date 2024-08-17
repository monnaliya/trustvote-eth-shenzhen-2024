'use client';

import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';

export default function LandingPage() {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new Web3Provider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.log('MetaMask is not installed');
    }
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
      } catch (err) {
        console.log('User rejected request:', err);
      }
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    setProvider(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative">
      <button
        onClick={connectWallet}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Connect MetaMask
      </button>
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-2">TrustVote</h1>
        <p className="text-lg mb-6">
          TrustVote is a decentralized voting platform where users can participate in secure and transparent voting processes. 
          Connect your wallet to start participating in votes and view existing polls.
        </p>
        {account ? (
          <>
            <button
              onClick={handleDisconnect}
              className="mt-4 px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
            >
              Log Out
            </button>
            <button
              onClick={() => console.log('Navigate to voting list')}
              className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
              View Voting List
            </button>
          </>
        ) : (
          <>
            <p className="text-lg mb-4">Please log in</p>
            <button
              onClick={connectWallet}
              className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
}