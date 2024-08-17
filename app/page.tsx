'use client';

import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new Web3Provider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.log('MetaMask is not installed');
    }
  }, []);

  const handleConnect = async () => {
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

  const handleLogin = () => {
    router.push('/voting-list');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative">
      <button
        onClick={handleConnect}
        className={`absolute top-5 right-5 px-6 py-3 font-semibold rounded-md ${
          account ? 'bg-green-600' : 'bg-blue-600'
        } text-white`}
      >
        {account ? 'Connected' : 'Connect MetaMask'}
      </button>
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-3/4 max-w-lg">
        <h1 className="text-3xl font-bold mb-4">TrustVote</h1>
        <p className="text-lg mb-4">
          TrustVote is a decentralized voting platform where users can participate in secure and transparent voting processes. Connect your wallet to start participating in votes and view existing polls.
        </p>
        {account ? (
          <div>
            <p className="mb-4">Connected Account: {account}</p>
            <button
              onClick={handleDisconnect}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md mb-4"
            >
              Log Out
            </button>
            <button
              onClick={handleLogin}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md"
            >
              View Voting List
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">Please log in</p>
            <button
              onClick={handleLogin}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}